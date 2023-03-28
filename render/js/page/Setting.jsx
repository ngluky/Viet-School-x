
class SwitchButton extends React.Component {

    componentDidMount() {
        var ele = document.getElementById(this.id)
        ele.checked = this.props.isCheck
    }

    render() {

        var {
            labelOn = '',
            labelOff = '',
            label = '',
            onClick = () => { },
            isCheck = false
        } = this.props;

        this.id = makeid(10);
        return (
            <div className="switchbutton" >
                <input type="checkbox" className="switchbutton-input" id={this.id} onChange={onClick} />
                <label htmlFor={this.id}>{label}</label>
                <p>{labelOff}</p>
                <p>{labelOn}</p>
            </div>
        )
    }
}

// function SwitchButton({
//     labelOn = '',
//     labelOff = '',
//     label = '',
//     onClick = () => { },
//     isCheck = false
// }) {

//     const id = makeid(10);

//     return (
//         <div className="switchbutton" >
//             <input type="checkbox" className="switchbutton-input" id={id} onChange={onClick} />
//             <label htmlFor={id}>{label}</label>
//             <p>{labelOff}</p>
//             <p>{labelOn}</p>
//         </div>
//     )
// }

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

function SettingUl({ data = [] }) {
    return (
        <React.Fragment>
            {data.map((e, index) => {
                return (
                    <React.Fragment key={index}>
                        {
                            e.data.map((e1 , index) => {
                                return (
                                    <React.Fragment key={index}>
                                        
                                        <h2>{e1.title}</h2>

                                        {
                                            e1.children.map((e2 , index) => {
                                                return (
                                                    <div className="appsetting-li" key={index}>
                                                        <div className="appsetting-li-left">
                                                            <p>{e2.title}</p>
                                                            {e2.description ? <p>{e2.description}</p> : <React.Fragment></React.Fragment>}
                                                        </div>
                                                        <div className="appsetting-li-right">
                                                            {e2.button.type == "switch" ? <SwitchButton isCheck={e2.button.isCheck} onClick={e2.button.active}/> : (
                                                                    <button className="appsetting-li-button" onClick={(e) => {e2.button.active(this)}}>
                                                                        <ion-icon name={e2.button.iconName}></ion-icon>
                                                                        <span>{e2.button.label}</span>
                                                                    </button>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    
                                    </React.Fragment>
                                )
                            })
                        }
                    </React.Fragment>
                )
            })}
        </React.Fragment>
    )
}



function AppSetting(props) {
    return (
        <div className="appsetting">
            <div className="appsetting-header">
                <div className="appsetting-icon-check-update">
                    <div className="logo">
                        <img src="./img/icon.png" alt="" />
                        <h2 className="animate__animated">
                            <span className="logoViet">Viet</span>
                            <span className="logoSchool">School</span>
                            <p>{Setting['version']}</p>
                        </h2>
                    </div>
                    <div className="setting-ver-update">
                        <button className="appsetting-update-button" onClick={() => {App.checkUpdate()}}>
                            check update
                        </button>
                    </div>
                </div>
                <div className="appsetting-community">
                    <div className="appsetting-community-li" onClick={() => {App.openLink('https://github.com/ngluky/Viet-School-x')}}>
                        <ion-icon name="logo-github"></ion-icon>
                        <div className="appsetting-community-li-body">
                            <p>GitHub</p>
                            <p>Source code</p>
                        </div>
                    </div>
                    <div className="appsetting-community-li" onClick={() => {App.openLink('https://github.com/ngluky/Viet-School-x/releases')}}>
                        <ion-icon name="newspaper"></ion-icon>
                        <div className="appsetting-community-li-body">
                            <p>What's new</p>
                            <p>Show release notes</p>
                        </div>
                    </div>
                    <div className="appsetting-community-li" onClick={() => {App.openLink('https://discord.gg/YjmNwa3bM9')}}>
                        <ion-icon name="logo-discord"></ion-icon>
                        <div className="appsetting-community-li-body">
                            <p>Discord</p>
                            <p>Update and report a problem</p>
                        </div>
                    </div>
                </div>
            </div>

            <SettingUl data={temlaySeting}></SettingUl>

        </div>

    )
}

function ListTabSetting() {
    return (
        <div className="list-tab">
            {temlaySeting.map((e , index) => {
                return (
                    <div className={index == 0 ? "list-tab-li on" : 'list-tab-li'} key={index}>
                        <ion-icon name={e.iconName}></ion-icon>
                        {e.name}
                    </div>
                )
            })}
        </div>
    )
}

function MainSetting(props) {
    const data = props.data
    return (
        <div className="setting-main">
            <div className="setting-list">
                <ListTabSetting />
            </div>
            <div className="setting-content">
                <AppSetting />
            </div>
            <div className="setting-close-button" onClick={() => { classhscp.renderInit() }}>
                <ion-icon name="close-circle-outline"></ion-icon>
            </div>
        </div>
    )
}
