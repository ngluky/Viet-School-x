const name2url = {
    "Toán" : "./img/Toan.jpg",
    "Vật lí" : "./img/VatLy.jpg",
    "Hóa học" : "./img/HoaHoc.jpg",
    "Sinh học" : "./img/SinhHoc.jpg",
    "Tin học" : "./img/TinHoc.jpg",
    "GD QP-AN" : "./img/GDCP.jpg",
    "Công nghệ" : "./img/CongNghe.jpg",
    "Ngữ văn" : "./img/Van.jpg",
    "Lịch Sử" : "./img/LinhSu.jpg",
    "Địa Lí" : "./img/DiaLy.jpg",
    "GDCD" : "./img/GDCD.jpg",
    "Thể dục" : "",
    "Ngoại ngữ" : "./img/TienAnh.jpg",
    "Tin học" : "./img/TinHoc.jpg"
}

function Filter(props) {
    const data = Array.from(new Set(props.data));
    const onClick = props.onClick;
    return (
        <div className="filter">
            <div className="filter-button sel" onClick={(event) => { onClick("All", event) }}>
                All
            </div>
            {data.map((e, i) => (
                <div key={i} onClick={(event) => onClick(e, event)} className="filter-button">
                    {e}
                </div>
            ))}

        </div>
    )
}

function Sub(props) {

    const backgrounds = [
        'yellowgreen',
        "orange",
        "tomato"
    ]
    
    var data = props.data;
    // console.log(data)
    var onJoinRoom = props.onClick
    return (
        <div className="sub" onClick={() => {onJoinRoom(data)}}>
            <div className="sub-sta" style={{
                background: backgrounds[data.TrangThaiID]
            }}>
                {data.TrangThai}
            </div>
            <div className="sub-img">
                <img src={name2url[data.TenMon]} alt="" />
            </div>
            <div className="sub-title">
                <p className="title">
                    {data.TenBaiHoc}
                </p>
            </div>
            <p className="sub-TenGiaoVien li">
                {data.TenGiaoVien} - {data.TenMon}
            </p>
            <p className="sub-date li">
                {data.NgayDayHienThi}
            </p>
        </div>
    )
}

function SlideBar() {
    return (
        <div></div>
    )
}

function ListSub(props) {
    const Classhscp = props.Classhscp;
    var children = Classhscp.arrListPhongHoc;
    return (
        <React.Fragment>
            <div className="list-sub">
                <Filter onClick={Classhscp.handleFilter} data={children.map((e) => e.TenMon)} />
                <div className="lis-sub-bottom">
                    <div className="sub-view">
                        {children.map((e, index) => <Sub key={index} data={e} onClick={Classhscp.JoinRoom}/>)}
                    </div>

                    <div className="slide-bar">

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}