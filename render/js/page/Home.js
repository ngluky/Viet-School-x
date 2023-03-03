
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
    var data = props.data;
    var onJoinRoom = props.onClick
    return (
        <div className="sub" onClick={() => {onJoinRoom(data)}}>
            <div className="sub-sta">
                {data.TrangThai}
            </div>
            <div className="sub-img">
                <img src="" alt="" />
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


function ListSub(props) {
    const Classhscp = props.Classhscp;
    var children = Classhscp.arrListPhongHoc;
    return (
        <React.Fragment>
            <div className="list-sub">
                <Filter onClick={Classhscp.handleFilter} data={children.map((e) => e.TenMon)} />
                <div className="sub-view">
                    {children.map((e, index) => <Sub key={index} data={e} onClick={Classhscp.JoinRoom}/>)}
                </div>
            </div>
        </React.Fragment>
    )
}