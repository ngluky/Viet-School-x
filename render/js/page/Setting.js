
function ContentSetting(props) {
    return (

        <Reac.Fragment>
            <div className="title">
                
            </div>
            <div className="body"></div>
        </Reac.Fragment>

    )
}

function MainSetting(props) {
    return (
        <div className="setting-main">
            <div className="setting-list">

            </div>
            <div className="setting-content">

            </div>
            <div className="setting-close-button" onClick={() => { classhscp.renderInit() }}>
                <ion-icon name="close-circle-outline"></ion-icon>
            </div>
        </div>
    )
}
