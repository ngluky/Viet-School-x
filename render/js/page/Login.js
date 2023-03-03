function LoginPage(props) {
    const onClick = props.onClick;

    return (
        <React.Fragment>
            <div className="conten">

                <div className="conten-center">
                    <div className="conten-logo">
                        VietSchool
                    </div>
                    <div className="conten-from">
                        <div className='from input'>
                            <input id="username" required></input>
                            <label htmlFor='username'>User</label>
                        </div>

                        <div className='from pass'>
                            <input id='pass' type="password" required></input>
                            <label htmlFor='pass'>Password</label>
                        </div>

                        <div className='remender'>
                            <input id='remender' type='checkbox'></input>
                            <label htmlFor='remender'>duy chì đăng nhập</label>
                        </div>
                    </div>

                    <div className='content-button' onClick={() => {
                        onClick(
                            document.getElementById("username").value,
                            document.getElementById("pass").value,
                            document.getElementById("remender").checked
                        )
                    }}>
                        Login
                    </div>
                </div>
            </div>
        </React.Fragment>

    )

}