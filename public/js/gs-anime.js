

// select all li elements on the page

const listItems = document.querySelectorAll('#cuisine-list li');


// loop through each li element and animate it using GSAP
listItems.forEach((item, index) => {
    gsap.set(item, { y: 100, opacity: 0 });
// Animate li element with a bounce effect
gsap.to(item, { 
    y: 0, 
    opacity: 1, 
    duration: 0.5, 
    delay: index * 0.2, 
    ease: 'bounce.out' 
  });
});





