<template>
    <div class="alertbox-container" ref="show-alertbox">
        <div class="alertbox-correct">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.alertbox-container{
    display:flex;
    position:fixed;
    top:0;
    right:0;
    width:20rem;
    align-items: center;
    height:5rem;
    opacity:0;
    pointer-events: none;
    transition: all .25s ease-out;
    background-color: #D6F5D6;
    color:#0C100B;
    border-left:10px solid #00a100;
    gap:1rem;
    z-index:999;
    .alertbox-correct{
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content:flex-start;
        gap:1rem;
        margin-left:1rem;
        width:100%;
        color:rgb(40, 40, 40);
    }
    &.active {
    opacity: 1;
    display: flex;
    pointer-events: all;
    transform: translate(-1rem,1rem);
    transition: all .25s ease-in-out;
  }
}
</style>