const name2url = {
    'Toán': "./img/Toan.jpg",
    "Vật lí": "./img/VatLy.jpg",
    "Hóa học": "./img/HoaHoc.jpg",
    "Sinh học": "./img/SinhHoc.jpg",
    "Tin học": "./img/TinHoc.jpg",
    "GD QP-AN": "./img/GDCP.jpg",
    "Công nghệ": "./img/CongNghe.jpg",
    "Ngữ văn": "./img/Van.jpg",
    "Lịch Sử": "./img/LinhSu.jpg",
    "Địa Lí": "./img/DiaLy.jpg",
    'GDCD': "./img/GDCD.jpg",
    "Thể dục": "",
    "Ngoại ngữ": "./img/TienAnh.jpg",
    "Tin học": "./img/TinHoc.jpg",
};
function Filter(props) {
    const data = Array.from(new Set(props.data));
    const onClick = props.onClick;
    return (
        <div className="filter">
            <div className="filter-list-button">
                <div
                    className="filter-button sel"
                    onClick={(event) => {
                        onClick("All", event);
                    }}
                >
                    All
                </div>
                {data.map((e, i) => (
                    <div
                        key={i}
                        onClick={(event) => onClick(e, event)}
                        className="filter-button"
                    >
                        {e}
                    </div>
                ))}
            </div>

            <div
                className="slide-bar-button"
                onClick={() => {
                    props.slideBar();
                }}
            >
                <ion-icon name="menu-outline"></ion-icon>
            </div>
        </div>
    );
}

function Sub(props) {
    const backgrounds = ["yellowgreen", "orange", "tomato"];

    var data = props.data;
    // console.log(data)
    var onJoinRoom = props.onClick;
    return (
        <div className="sub" onClick={() => {onJoinRoom(data);}}>
            <div
                className="sub-sta"
                style={{background: backgrounds[data.TrangThaiID],}}
            >
                {data.TrangThai}
            </div>
            <div className="sub-img">
                <img src={name2url[data.TenMon]} alt="" />
            </div>
            <div className="sub-title">
                <p className="title">{data.TenBaiHoc}</p>
            </div>
            <p className="sub-TenGiaoVien li">
                {data.TenGiaoVien} - {data.TenMon}
            </p>
            <p className="sub-date li">{data.NgayDayHienThi}</p>
        </div>
    );
}

function SlideBar() {
    return (
        <div className="slide-bar-connet">
            <div className="slide-bar-top">
                <div className="slide-bar-li">
                    <div className="slide-bar-li-title">
                        <ion-icon name="home"></ion-icon>
                        <p>Phòng học</p>
                        <div className="slide-bar-end">
                            <ion-icon name="caret-down"></ion-icon>
                        </div>
                    </div>

                    <div className="slide-bar-li-chill">
                        <li>
                            <p>Đang diễn ra</p>
                        </li>
                        <li>
                            <p>Chưa bắt đầu</p>
                        </li>
                        <li>
                            <p>Đã kết thúc</p>
                        </li>
                    </div>
                </div>

                <div className="slide-bar-li">
                    <div className="slide-bar-li-title">
                        <ion-icon name="bar-chart"></ion-icon>
                        <p>Điểm</p>
                        <div className="slide-bar-end">
                            <ion-icon name="caret-down"></ion-icon>
                        </div>
                    </div>

                    <div className="slide-bar-li-chill">
                        <li>
                            <p>Điểm lớp học</p>
                        </li>
                        <li>
                            <p>Điểm trên trường</p>
                        </li>
                    </div>
                </div>

                <div className="slide-bar-li">
                    <div className="slide-bar-li-title">
                        <ion-icon name="contrast"></ion-icon>
                        <p>Theme</p>
                        <div className="slide-bar-end">
                            <ion-icon name="caret-down"></ion-icon>
                        </div>
                    </div>

                    <div className="slide-bar-li-chill">
                        <li>
                            <p>Light mod</p>
                        </li>
                        <li>
                            <p>Dark mod</p>
                        </li>
                        <li>
                            <p>System mod</p>
                        </li>
                    </div>
                </div>
            </div>
            <div className="slide-bar-bottom"></div>
        </div>
    );
}

function ListSub(props) {
    const Classhscp = props.Classhscp;
    var children = Classhscp.arrListPhongHoc;
    return (
        <React.Fragment>
            <div className="list-sub">
                <Filter
                    onClick={Classhscp.handleFilter}
                    slideBar={Classhscp.handlslideBar}
                    data={children.map((e) => e.TenMon)}
                />
                <div className="lis-sub-bottom">
                    <div className="sub-view" onResize={(e) => {console.log(e);}}>
                        {children.map((e, index) => ( <Sub key={index} data={e} onClick={Classhscp.JoinRoom} /> ))}
                    </div>

                    <div className="slide-bar" id="listPhongSlideBar">
                        <SlideBar />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
