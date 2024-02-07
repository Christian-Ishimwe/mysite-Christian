// const sections = document.querySelectorAll('nav a');

// // Function to check if an element is in the viewport
// const isInViewport = (elem) => {
//     const rect = elem.getBoundingClientRect();
//     return (
//         rect.top >= 0 &&
//         rect.left >= 0 &&
//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//     );
// };

// // Function to handle scroll event
// const handleScroll = () => {
//     console.log(window.innerHeight)
//     sections.forEach(section => {
//         if (isInViewport(section)) {
//             section.classList.add('highlight');
//         } else {
//             section.classList.remove('highlight');
//         }
//     });
// };

// // Add scroll event listener
// window.addEventListener('scroll', handleScroll);