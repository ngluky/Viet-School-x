function SideBarButton(props) {
    

    if (props.title) {
        return (
            <div className={"sidebar-button " + props.on} onClick={() => {props.onClick()}}>
                <div className='sidebar-button-svg'>
                    <ion-icon name={props.nameIcon}></ion-icon>
                </div>
                <div className='sidebar-button-text'>
                    <p>{props.title}</p>
                </div>
            </div>
        )
    }

    else {
        return (
            <div className={"sidebar-button " + props.on} onClick={() => {props.onClick()}}>
                <div className='sidebar-button-svg'>
                    <ion-icon name={props.nameIcon}></ion-icon>
                </div>
            </div>
        )
    }

    
}

function SideBar(props) {
    const eventSideBar = props.eventHandl;
    console.log(eventSideBar)
    return (
        <div className="sidebar">
            <div className="sidebar-top">

                <SideBarButton on="on" nameIcon="chatbox-outline" title="Thỏa luận"/>
                <SideBarButton on="on" nameIcon="book-outline" title="Lý thuyết"/>
                <SideBarButton nameIcon="videocam-outline" title="Live"/>
                <SideBarButton nameIcon="create-outline" title="Bài tập"/>

            </div>
            <div className="sidebar-botton">
                <SideBarButton nameIcon="log-out-outline" onClick={eventSideBar.out}/>
            </div>
        </div>
    )
}

function Header(props) {
    const tenMon = props.tenMon;
    const title = props.title;

    return (
        <div className="header">
            <div className="header-name">
                Môn: {tenMon}
            </div>
            <div className="header-title">
                Bài: {title}
            </div>
            <div className="header-info"></div>
        </div>
    )
}

function ChatTab() {
    return (
        <div></div>
    )
}

function PhongHoc(props) {
    const classhtt = props.classhtt;
    const item = classhtt.arr_Data_BaiHoc;
    return (
        <React.Fragment>
            <div className="phonghoc">
                <div className="phonghoc-row1">
                    <SideBar eventHandl={classhtt.handlSideBar}/>

                    <div className='phonghoc-chat-conter'>
                        <div className='phonghoc-chat'>
                            <ChatTab />
                        </div>
                        <div className='phonghoc-content'>
                            <div className="phonghoc-content-top">
                                {item.TenBaiHoc}
                            </div>

                            <div className="phonghoc-content-bottom">
                                <div className="phonghoc-content-bottom-content" id="noidungbaihoc">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}
