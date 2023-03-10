function SideBarButton(props) {
    var type = props.type;
    if (!type) {
        type = "button";
    }
    switch (type) {
        case "button":
            var on = props.on;
            if (!props.on) on = "";
            else on = "on";

            if (props.title) {
                return (
                    <div
                        className={"action-button"}
                        onClick={() => {
                            props.onClick();
                        }}
                    >
                        <div className="action-button-svg">
                            <ion-icon name={props.nameIcon}></ion-icon>
                        </div>
                        <div className="action-button-text">
                            <p>{props.title}</p>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div
                        className={"action-button"}
                        onClick={() => {
                            props.onClick();
                        }}
                    >
                        <div className="action-button-svg">
                            <ion-icon name={props.nameIcon}></ion-icon>
                        </div>
                    </div>
                );
            }

        case "radio":
            var buttonSeleStyleTemplay = {
                "border-left": "3px solid rgb(98, 0, 255)",
            };
            var on = props.on;
            if (!props.on) on = "";
            else on = "on";

            if (props.onStyle) buttonSeleStyleTemplay = props.onStyle;

            var buttonSeleStyle = {};

            Object.keys(buttonSeleStyleTemplay).forEach((e) => {
                var str = e;
                var index = e.indexOf("-");
                if (e.indexOf("-") != -1) {
                    var newRp = str.charAt(index + 1).toUpperCase();
                    str = str.replace(`-${str.charAt(index + 1)}`, newRp);
                }
                buttonSeleStyle[str] = buttonSeleStyleTemplay[e];
            });

            const clasId = makeid(6);
            const handlOnClick = function () {
                const ele = document.querySelector(".action-button.radio." + clasId);
                const parent = ele.parentElement;
                parent.querySelectorAll(".radio").forEach((e) => {
                    e.classList.remove("on");
                    e.style = {};
                });

                ele.classList.add("on");

                Object.keys(buttonSeleStyle).forEach((e) => {
                    ele.style[e] = buttonSeleStyle[e];
                });
            };

            if (props.title) {
                return (
                    <div
                        className={"action-button radio " + on + " " + clasId}
                        style={props.on ? buttonSeleStyle : {}}
                        onClick={() => {
                            handlOnClick();
                            props.onClick();
                        }}
                    >
                        <div className="action-button-svg">
                            <ion-icon name={props.nameIcon}></ion-icon>
                        </div>
                        <div className="action-button-text">
                            <p>{props.title}</p>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div
                        className={"action-button radio" + on + " " + clasId}
                        onClick={() => {
                            handlOnClick();
                            props.onClick();
                        }}
                    >
                        <div className="action-button-svg">
                            <ion-icon name={props.nameIcon}></ion-icon>
                        </div>
                    </div>
                );
            }

        case "check":
            var on = props.on;
            const styleOnCheck = props.onStyle;
            const id = makeid(6);
            return (
                <div
                    className="action-button "
                    style={on ? {} : styleOnCheck}
                    id={id}
                    onClick={() => {
                        const ele = document.getElementById(id);
                        if (!on) {
                            on = !on;
                            ele.style = {};
                            props.onClick(false);
                        } else {
                            on = !on;
                            Object.keys(styleOnCheck).forEach((e) => {
                                ele.style[e] = styleOnCheck[e];
                            });
                            props.onClick(true);
                        }
                    }}
                >
                    <div className="action-button-svg">
                        <ion-icon name={props.nameIcon}></ion-icon>
                    </div>
                </div>
            );
    }
}

function BaiTap(props) {
    const classttn = props.classttn;
    return (
        <React.Fragment>
            <div className="div-cauhoi">
                <div className="cauhoi">
                    <span className="stt">Câu 1</span>
                    <span id="noidungcauhoi"></span>
                </div>

                <div className="dapan">
                    <div className="dapan-A dp">
                        <input type="radio" name="gr-dapan" id="dapan-A" />
                        <label htmlFor="dapan-A">
                            <div className="hed">A</div>
                            <div className="noidung" id="noidung-da-A"></div>
                        </label>
                    </div>
                    <div className="dapan-B dp">
                        <input type="radio" name="gr-dapan" id="dapan-B" />
                        <label htmlFor="dapan-B">
                            <div className="hed">B</div>
                            <div className="noidung" id="noidung-da-B"></div>
                        </label>
                    </div>
                    <div className="dapan-C dp">
                        <input type="radio" name="gr-dapan" id="dapan-C" />
                        <label htmlFor="dapan-C">
                            <div className="hed">C</div>
                            <div className="noidung" id="noidung-da-C"></div>
                        </label>
                    </div>
                    <div className="dapan-D dp">
                        <input type="radio" name="gr-dapan" id="dapan-D" />
                        <label htmlFor="dapan-D">
                            <div className="hed">D</div>
                            <div className="noidung" id="noidung-da-D"></div>
                        </label>
                    </div>
                </div>
            </div>

            <div className="bottom-key">
                <div className="bottom-key-timer">
                    <ion-icon name="hourglass-outline"></ion-icon>
                    <p id="bottom-timer">20p 30s</p>
                </div>
                <div className="bottom-key-contro-key">
                    <div className="bottom-button" onClick={() => classttn.backSlide()}>
                        <ion-icon name="arrow-back-outline"></ion-icon>
                    </div>
                    <div className="bottom-button">
                        <ion-icon name="help-outline"></ion-icon>
                    </div>
                    <div className="bottom-button" onClick={() => classttn.nextSlide()}>
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </div>
                </div>
                <div className="bottom-key-dalam">
                    <ion-icon name="checkmark-outline"></ion-icon>
                    <p id="bottom-dalam">20/30</p>
                </div>
            </div>
        </React.Fragment>
    );
}

function BaiHoc() {
    return (
        <div className="phonghoc-content-bottom-content" id="noidungbaihoc"></div>
    );
}

function SideBar(props) {
    const eventSideBar = props.eventHandl;
    console.log(eventSideBar);
    return (
        <div className="action">
            <div className="action-top">
                <SideBarButton
                    type="radio"
                    on="on"
                    nameIcon="book-outline"
                    title="Lý thuyết"
                    onClick={eventSideBar.baiHoc}
                />
                <SideBarButton type="radio" nameIcon="videocam-outline" title="Live" />
                <SideBarButton
                    type="radio"
                    nameIcon="create-outline"
                    title="Bài tập"
                    onClick={eventSideBar.baiTap}
                />
            </div>
            <div className="action-botton">
                <SideBarButton
                    nameIcon="chevron-forward-outline"
                    type="check"
                    on={eventSideBar.isSideBar()}
                    onStyle={{ transform: "rotate(180deg)" }}
                    onClick={eventSideBar.chatOnOff}
                />
                <SideBarButton nameIcon="log-out-outline" onClick={eventSideBar.out} />
            </div>
        </div>
    );
}

function MenuButton(props) {
    return (
        <div className="list-menu-button" onClick={() => { props.onClick(); }}>
            <ion-icon name={props.iconName}></ion-icon>
            <p className="list-menu-title">{props.title}</p>
        </div>
    );
}

function Menu(props) {
    return (
        <div className="list-menu">
            {props.data.map((e, index) => (
                <MenuButton key={index} {...e} />
            ))}
        </div>
    );
}

function SideBarLoading() {
    return (
        <div className="list-lop-center">
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

function ListLop(props) {

    var data = props.data;

    const countOnline = data[1].filter(e => e.Online).length

    return (
        <div className="list-lop">
            <div className="list-lop-title">
                <p className="list-lop-name">
                    {data[0]} - {countOnline}\{data[1].length}
                </p>

                <div className="list-lop-icon">
                    <ion-icon name="chevron-down-outline"></ion-icon>
                </div>

            </div>

            <div className="list-lop-view">
                {data[1].map((e , index) => (
                    <div key={index} className={`list-hocsinh ${e.Online ? 'online' : ''}`}>
                        <p className="hocsinh-stt-name">{index + 1} - {e.HoTen}</p>
                        <div className="hocsinh-status"></div>
                    </div>
                ))}
            </div>
        </div>
    )
    
}

function ListHocSinh(props) {
    var data = props.data;

    data = Object.entries(data)

    return (
        <div className="list-hoc-sinh">
            {data.map((e, index) => <ListLop key={index} data={e}/>)}
        </div>
    )
}

function ChatTab(props) {
    const classhtt = props.classhtt;

    const handlOff = function() {
        const ele = document.querySelector('.chat-bottom-button.lamlai .chat-bottom-button-list');
        console.log('ok')
        ele.classList.remove('on')
        document.getElementById('root').removeEventListener('click', handlOff , false)
    }

    const handlOnOff = function() {
        const ele = document.querySelector('.chat-bottom-button.lamlai .chat-bottom-button-list');
        if (ele.classList.contains('on')) {
            ele.classList.remove('on')
        }
        else {
            ele.classList.add('on')

            document.getElementById('root').addEventListener('click', handlOff)
        }
    }

    return (
        <React.Fragment>
            <div className="chat-top">
                
            </div>

            <div className="chat-content" id="slideBarContent">
                <Menu data={classhtt.slideBarTool} />
            </div>

            <div className="chat-bottom">
                <button className="chat-bottom-button lamlai" style={classhtt.isOnTap ? {} : {'display': 'none'}} onClick={() => {
                    handlOnOff()
                }}>
                    <ion-icon name="caret-up-outline"></ion-icon>

                    <div className="chat-bottom-button-list">
                        <div onClick={() => {classttn.lamBaiLai()}}>Làm bài lại</div>
                        <div onClick={() => {classttn.lamBaiLai(true)}}>Làm lại bài mới</div>
                    </div>

                </button>

                <button className="chat-bottom-button" onClick={() => {
                    classttn.handlNopBai()
                }}>
                    nopbai
                </button>
            </div>
        </React.Fragment>
    );
}

function PhongHoc(props) {
    const classhtt = props.classhtt;
    const item = classhtt.arr_Data_BaiHoc;
    console.log(classhtt.isSideBar);
    return (
        <React.Fragment>
            <div className="phonghoc">
                <div className="phonghoc-row1">
                    <SideBar eventHandl={classhtt.handlSideBar} />

                    <div className="phonghoc-chat-conter">
                        <div className="phonghoc-chat" id="side-bar" style={ classhtt.isSideBar ? {} : { width: "0px", margin: "0", opacity: "0" }}>
                            <ChatTab classhtt={classhtt} />
                        </div>
                        <div className="phonghoc-content">
                            <div className="phonghoc-content-top">
                                <p>
                                    {item.TenMon} - {item.TenBaiHoc}
                                </p>
                            </div>

                            <div className="phonghoc-content-bottom" id="content">
                                <BaiHoc />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
