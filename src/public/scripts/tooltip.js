const btnTooltip = document.querySelector('.btn-tooltip');
const toolTip = document.querySelector('.tooltip');

btnTooltip.addEventListener('mouseenter', e=>{
  addButtonEvent(e.type, 1);
})
btnTooltip.addEventListener('mouseleave', e=>{
  addButtonEvent(e.type, 0);
})

btnTooltip.addEventListener('focus', e=>{
  addButtonEvent(e.type, 1);
})

btnTooltip.addEventListener('blur', e=>{
  addButtonEvent(e.type, 0);
})

function addButtonEvent(event, opacity){
  toolTip.style.opacity = opacity;
}