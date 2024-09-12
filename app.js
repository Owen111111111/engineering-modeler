document.getElementById('problemForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect the form data
    const problemType = document.getElementById('problemType').value;
    const additionalData = {};

    // Collect additional fields depending on the problem type
    document.querySelectorAll('#additionalFields input').forEach(input => {
        additionalData[input.name] = input.value;
    });

    // Send data to the backend for problem solving
    fetch('/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ problemType, additionalData })
    })
    .then(response => response.json())
    .then(data => {
        // Render 3D model based on the returned data
        renderModel(problemType, data);
    });
});

// Update the form with relevant fields based on problem type
function updateForm() {
    const problemType = document.getElementById('problemType').value;
    const additionalFields = document.getElementById('additionalFields');
    additionalFields.innerHTML = '';

    if (problemType === 'mechanical') {
        additionalFields.innerHTML += '<label for="force">Force (N):</label><input type="number" id="force" name="force" required>';
        additionalFields.innerHTML += '<label for="distance">Distance (m):</label><input type="number" id="distance" name="distance" required>';
    } else if (problemType === 'electrical') {
        additionalFields.innerHTML += '<label for="voltage">Voltage (V):</label><input type="number" id="voltage" name="voltage" required>';
        additionalFields.innerHTML += '<label for="resistance">Resistance (Ω):</label><input type="number" id="resistance" name="resistance" required>';
    }
    // Add more fields for other problem types...
}

// Three.js: Render 3D models based on the problem type and solution
function renderModel(problemType, data) {
    const container = document.getElementById('3dModelContainer');
    container.innerHTML = '';  // Clear previous model

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(600, 400);
    container.appendChild(renderer.domElement);

    if (problemType === 'mechanical') {
        // Example: Create a beam or lever system based on the solution
        const geometry = new THREE.BoxGeometry(data.length, 0.5, 0.5);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const object = new THREE.Mesh(geometry, material);
        scene.add(object);
    } else if (problemType === 'electrical') {
        // Example: Create a visual circuit diagram (e.g., battery and resistor)
        // Simulate basic voltage/resistance problem
    }

    camera.position.z = 5;
    renderer.render(scene, camera);
}