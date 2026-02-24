## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Ans: We can find a element by a specific given id for this we use getElementById, we can find multiple element by using the class getElementByClassName, with querySelector / querySelectorAll we can find the element by css selector syntax.

### 2. How do you create and insert a new element into the DOM?

Ans: it can be create by a class using createElement(). giving an example:
const div = document.getElementById("div"); // catching a div from container from the HTML
div.createElement("div") //creating div under a div.

### 3. What is Event Bubbling? And how does it work?

Ans: Event Bubbling is a common javascript behavior. In the dom tree it triggered on a child element propagates upward parent element.When you click a button inside a div and body, the event triggers the button's handler, then the div handler, then the body handler, in that order.

### 4. What is Event Delegation in JavaScript? Why is it useful?

Ans: Event delegation is a JavaScript technique where we attach a single event listener to a parent element to manage events for all of its inside elements. One benefit is we don't have to add event listener to all the sections.

### 5. What is the difference between preventDefault() and stopPropagation() methods?

Ans: event.preventDefault() stops the browser's default action for an event and event.stopPropagation() stops the event from moving further up or down the DOM hierarchy (propagation). They control different aspects of event handling.
