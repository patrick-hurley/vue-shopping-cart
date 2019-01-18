<script>
export default {
    render:function(createElement){
        return createElement(
            'div', { class: 'content' }, [
                createElement('h2','Welcome to the store'),
                createElement('p', 'Select a department to get started')
            ]
        )
    }
}
</script>

<style scoped>

.content {
    background: #f5f5f5;
    padding: 20px 30px 50px;
    height: 100%;
}

h2 {
    font-size: 25px;
    font-weight: 900;
    margin: 10px 0 20px;
}

</style>