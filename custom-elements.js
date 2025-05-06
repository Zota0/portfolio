const templatesIds = [
    { publicSrc: '#project-show-template-public-src'},
    { publicDoc: '#project-show-template-public-doc'},
    { closedSrc: '#project-show-template-closed-src'},
];

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        setInterval(loadProjects, 10000);
        loadProjects();
    }, 1000);
});

function loadProjects() {
    let templates;
    for (let i = 0; i < templatesIds.length; i++) {
        // Correctly access the selector value inside the object
        templates = templates ?? document.querySelector(Object.values(templatesIds[i])[0]);
    }

    // Create a reusable project template with styling
    const projectTemplate = document.createElement('template');
    projectTemplate.innerHTML = `
        <style>
            :host {
                display: block;
                margin: 1rem;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                border-radius: 12px;
                overflow: hidden;
                background: white;
                font-family: Arial, sans-serif;
                transition: transform 0.2s ease-in-out;
            }

            :host(:hover) {
                transform: translateY(-5px);
                box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
            }

            .project {
                display: flex;
                flex-direction: column;
                align-items: stretch;
                padding: 1rem;
                gap: 0.5rem;
            }

            img {
                width: 100%;
                height: auto;
                object-fit: cover;
                border-radius: 8px;
            }

            h3 {
                margin: 0.5rem 0 0.25rem;
                font-size: 1.25rem;
                color: #333;
            }

            p {
                margin: 0;
                color: #555;
                font-size: 0.95rem;
            }

            a {
                margin-top: auto;
                display: inline-block;
                background: #007BFF;
                color: white;
                text-decoration: none;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                font-size: 0.9rem;
                transition: background 0.2s ease-in-out;
            }

            a:hover {
                background: #0056b3;
            }
        </style>
        <div class="project">
            <img src="" alt="Project Image">
            <h3></h3>
            <p></p>
            <a href="" target="_blank">View Demo</a>
        </div>
    `;

    class Project extends HTMLElement {
        static observedAttributes = ['src', 'title', 'desc', 'demo', 'type', 'width', 'height'];

        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(projectTemplate.content.cloneNode(true));
        }

        attributeChangedCallback(name, oldValue, newValue) {
            console.log(`Attribute '${name}' changed from '${oldValue}' to '${newValue}'.`);
            this.connectedCallback();
        }

        connectedCallback() {
            this.shadowRoot.querySelector('img').src = this.getAttribute('src');
            this.shadowRoot.querySelector('img').alt = this.getAttribute('title');
            this.shadowRoot.querySelector('h3').textContent = this.getAttribute('title');
            this.shadowRoot.querySelector('p').textContent = this.getAttribute('desc');
            this.shadowRoot.querySelector('a').href = this.getAttribute('demo');
            this.shadowRoot.querySelector('img').width = this.getAttribute('width');
            this.shadowRoot.querySelector('img').height = this.getAttribute('height');
        }
    }

    if (!customElements.get('my-project')) {
        customElements.define('my-project', Project);
    }
}
