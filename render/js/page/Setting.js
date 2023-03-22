
function ContentSetting(props) {
    return (

        <Reac.Fragment>
            <div className="title">
                
            </div>
            <div className="body"></div>
        </Reac.Fragment>

    )
}

function SettingTab(props) {
    return (
        <div></div>
    )
}

function CssView() {
    return (
        <div className="setingview">

        </div>
    )
}

function EditThemeSetting() {
    return (
        <div className="setting-edit">
            <div className="setting-line-theme">
                <div className="setting-left-theme">
                    <p>Background</p>
                </div>
                <div className="setting-right-theme">
                    
                </div>
            </div>
        </div>
    )
}

function ThemeSetting() {
    return (
        <React.Fragment>
            <CssView />
            <EditThemeSetting />
        </React.Fragment>
    )
}

function MainSetting(props) {
    const data = props.data
    return (
        <div className="setting-main">
            <div className="setting-list">

            </div>
            <div className="setting-content">
                <ThemeSetting />
            </div>
            <div className="setting-close-button" onClick={() => { classhscp.renderInit() }}>
                <ion-icon name="close-circle-outline"></ion-icon>
            </div>
        </div>
    )
}
