// You can use JavaScript to dynamically populate the email header and content with data.
// For example, if you have an array of objects representing images with metadata:
const images = [
    {
        name: 'Image 1',
        subject: 'Subject 1',
        date: '2024-02-22',
        src: 'image1.jpg'
    },
    {
        name: 'Image 2',
        subject: 'Subject 2',
        date: '2024-02-23',
        src: 'image2.jpg'
    }
];
const container = document.getElementById('email-container');
images.forEach(image => {

    const email = document.createElement('div');
    email.classList.add('email');

    const header = document.createElement('div');
    header.classList.add('email-header');
    header.innerHTML = `
        <div class="email-header-subject">Subject: ${image.subject}</div>
        <div class="email-header-date">Date: ${image.date}</div>
        <div class="email-header-actions">
            <i class="fa fa-reply"></i>
            <i class="fa fa-trash"></i>
            <i class="fa fa-eye"></i>
        </div>
    `;

    const content = document.createElement('div');
    content.classList.add('email-content');
    const img = document.createElement('img');
    img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg";
    img.alt = image.name;
    content.appendChild(img);
    email.appendChild(header);
    email.appendChild(content);
    container.appendChild(email);
});
