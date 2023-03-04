function SideBarButton(props) {
    var type = props.type;
    if (!type) {
        type = "button"
    }
    switch (type) {
        case "button":
            if (props.title) {
                return (
                    <div className={"action-button " + props.on} onClick={() => { props.onClick() }}>
                        <div className='action-button-svg'>
                            <ion-icon name={props.nameIcon}></ion-icon>
                        </div>
                        <div className='action-button-text'>
                            <p>{props.title}</p>
                        </div>
                    </div>
                )
            }
        
            else {
                return (
                    <div className={"action-button " + props.on} onClick={() => { props.onClick() }}>
                        <div className='action-button-svg'>
                            <ion-icon name={props.nameIcon}></ion-icon>
                        </div>
                    </div>
                )
            }
        
        case "check":
            const styleOnCheck = props.onCheckStyle;
            const id = makeid(6);
            return (
                <div className="action-button " id={id} onClick={() => {
                    const ele = document.getElementById(id)
                    if (ele.classList.contains("check-on")) {
                        ele.classList.remove('check-on')
                        ele.style = {}
                        props.onClick(false)

                    }
                    else {
                        ele.classList.add('check-on')
                        Object.keys(styleOnCheck).forEach(e => {
                            ele.style[e] = styleOnCheck[e]
                        })
                        props.onClick(true)
                    }
                }}>
                    <div className='action-button-svg'>
                        <ion-icon name={props.nameIcon}></ion-icon>
                    </div>
                </div>
            )
    }
    
    


}

function BaiTap() {
    return (
        <React.Fragment>
            <div className="div-cauhoi">

                <div className="cauhoi">
                    <span className="stt">Câu 1</span>
                    <span></span>
                </div>

                <div className="dapan">
                    <div className="dapan-A dp">
                        <input type="radio" name="gr-dapan" id="dapan-A" />
                        <label htmlFor="dapan-A">
                            <div className="hed">A</div>
                            <div className="noidung">
                                hello
                            </div>

                        </label>
                    </div>
                    <div className="dapan-B dp">
                        <input type="radio" name="gr-dapan" id="dapan-B" />
                        <label htmlFor="dapan-B">
                            <div className="hed">B</div>
                            <div className="noidung">
                                hello
                            </div>
                        </label>
                    </div>
                    <div className="dapan-C dp">
                        <input type="radio" name="gr-dapan" id="dapan-C" />
                        <label htmlFor="dapan-C">
                            <div className="hed">C</div>
                            <div className="noidung">
                                hello
                            </div>
                        </label>
                    </div>
                    <div className="dapan-D dp">
                        <input type="radio" name="gr-dapan" id="dapan-D" />
                        <label htmlFor="dapan-D">
                            <div className="hed">D</div>
                            <div className="noidung">
                                hello
                            </div>
                        </label>
                    </div>

                </div>
            </div>

        </React.Fragment>
    )
}

function BaiHoc() {
    return (
        <div className="phonghoc-content-bottom-content" id="noidungbaihoc">
        </div>
    )
}

function SideBar(props) {
    const eventSideBar = props.eventHandl;
    console.log(eventSideBar)
    return (
        <div className="action">
            <div className="action-top">
                <SideBarButton on="on" nameIcon="book-outline" title="Lý thuyết" />
                <SideBarButton nameIcon="videocam-outline" title="Live" />
                <SideBarButton nameIcon="create-outline" title="Bài tập" onClick={eventSideBar.baiTap}/>

            </div>
            <div className="action-botton">
                <SideBarButton nameIcon="chevron-forward-outline" type="check" onCheckStyle={{transform:"rotate(180deg)"}} onClick={eventSideBar.chatOnOff}/>
                <SideBarButton nameIcon="log-out-outline" onClick={eventSideBar.out} />
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
                    <SideBar eventHandl={classhtt.handlSideBar} />

                    <div className='phonghoc-chat-conter'>
                        <div className='phonghoc-chat' id="side-bar">
                            <ChatTab />
                        </div>
                        <div className='phonghoc-content'>
                            <div className="phonghoc-content-top">
                                {item.TenBaiHoc}
                            </div>

                            <div className="phonghoc-content-bottom" id="content">
                                <BaiHoc />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}
