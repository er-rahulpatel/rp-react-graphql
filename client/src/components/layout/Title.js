
const getStyles = () => ({
    title: {
        fontSize: '1.5em',
        fontWeight: 'bold',
        margin: '0 0 0.5em 0'
    }
})


const Title = ({ text }) => {
    const styles = getStyles()
    return (
        <h1 style={styles.title}>{text}</h1>
    );
}
export default Title;
