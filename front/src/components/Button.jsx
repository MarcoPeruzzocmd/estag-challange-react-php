function Button(props) {
    return(
        <div>
            <button onClick={props.event} type="submit">{props.text}</button>
        </div>
    )
}
export default Button