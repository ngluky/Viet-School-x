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
// function Filter(props) {
//     const data = Array.from(new Set(props.data));
//     const onClick = props.onClick;

//     const [index, setIndex] = React.useState(0)

//     return (
//         <div className="filter">
//             <div className="filter-list-button">
//                 <div
//                     className={index == 0 ? "filter-button sel" : "filter-button"}
//                     onClick={(event) => {
//                         setIndex(0)
//                         onClick("All");
//                     }}
//                 >
//                     All
//                 </div>
//                 {data.map((e, i) => (
//                     <div
//                         key={i}
//                         onClick={(event) => {
//                             onClick(e)
//                             setIndex(i + 1)
//                         }}
//                         className={index == (i + 1) ? "filter-button sel" : "filter-button"}
//                     >
//                         <span>
//                             {e}
//                         </span>
//                     </div>
//                 ))}
//             </div>

//             <div
//                 className="slide-bar-button"
//                 onClick={() => {
//                     props.slideBar();
//                 }}
//             >
//                 <ion-icon name="menu-outline"></ion-icon>
//             </div>
//         </div>
//     );
// }

function ListButton(props) {
    const id = React.useId()
    const [onActive , setOnActive] = React.useState(false)

    React.useEffect(() => {
        return (() => {
            document.removeEventListener("click", turnOff)
        })
    }, [])

    const turnOff = (event) => {
        var target = $(event.target);   
        // kiểm tra xem có phải là con của "div.filter-conten"
        if (target.parents('div.filter-conten').length) return
        
        var ele = document.getElementById(id)
        if (ele) ele.style.transform = 'scaleY(0)'

        setTimeout(() => {
            document.removeEventListener("click", turnOff)
        }, 100)

        setTimeout(() => {
            setOnActive(false)
        }, (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--time-animation').replace('s' , '')) + 0.1) * 1000) 
    }

    const turnOn = props.onClick || function(event) {
        if (onActive) return
        setTimeout(() => {
            document.addEventListener("click", turnOff)
        }, 100)
        setOnActive(true)
    }

    return (
        <div className="filter-button">
            <div className="filter-title" onClick={turnOn}>
                <ion-icon name={props.Icon}></ion-icon>
                <span>{props.Text}</span>
            </div>

            {onActive && props.children ? (
                <div className="templay">
                    <div className="filter-conten" id={id}>
                        {props.children}
                    </div> 
                </div>
            ) : ''}
            


        </div>
    )
}

function Filter(props) {
    const arrMonHoc = Array.from(new Set(props.data.arrListPhongHoc.map(e => e.TenMon)));
    const [onMonSele , setMonSele] = React.useState(props.data.arrListFilterMon)
    const [proSeleSort, setProSeleSort] = React.useState(props.data.lastSort)
    return (
        <div className="filter">
            <div className="type-filter">
                <ListButton Icon="book" Text="Môn">
                    <div className="mon-view-sel">
                        {arrMonHoc.map((e , index) => {
                            // console.log([...onMonSele].includes(e) , e)
                            return <div className="mon-ops" key={index} style={[...onMonSele].includes(e) ? {filter: 'brightness(1.5)', 'borderWidth': '2px'} : {}} onClick={() => {
                                setMonSele(arr => {
                                    var newArr = [...arr]
                                    if (newArr.includes(e)) {
                                        newArr.splice(newArr.indexOf(e) , 1)
                                    }
                                    else {
                                        newArr.push(e)
                                    }
                                    console.log(newArr)
                                    return newArr
                                })
                                classhscp.changeFilterMon(e)
                            }}>
                                {e}
                            </div>
                        })}
                    </div>
                </ListButton>
                <ListButton Icon="list" Text="Loại phòng">

                </ListButton>
                <ListButton Icon="funnel" Text="Sort">
                    <div className="sort-view-sele">
                        <div className="sort-ops" style={"GioDay" == proSeleSort ? {filter: 'brightness(1.5)'} : {}} onClick={() => {
                            classhscp.handleSort(classhscp.arrListPhongHocView , "GioDay" , true)
                            setProSeleSort((e) => {
                                if (e == "GioDay")
                                    return ''
                                else {
                                    return "GioDay"
                                }
                            })
                        }}>
                            <ion-icon name="calendar-number"></ion-icon>
                            <span>
                                Thời gian tải lên
                            </span>
                        </div>
                        <div className="sort-ops" style={"TenBaiHoc" == proSeleSort ? {filter: 'brightness(1.5)'} : {}} onClick={() => {
                            classhscp.handleSort(classhscp.arrListPhongHocView , "TenBaiHoc" , true)
                            setProSeleSort((e) => {
                                if (e == "TenBaiHoc")
                                    return ''
                                else {
                                    return "TenBaiHoc"
                                }
                            })
                        }}>  
                            <ion-icon src="svg/sort-alpha-down-svgrepo-com.svg"></ion-icon>
                            <span>
                                Tên bài học
                            </span>
                        </div>
                    </div>
                </ListButton>

                <ListButton Icon="close" Text="Clear" onClick={() => {
                    classhscp.handleFilter("All")
                }}>

                </ListButton>

                <ListButton Icon="refresh" Text="refresh" onClick={() => {console.log('hello')}}>

                </ListButton>
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
    )
}

function Sub(props) {
    const backgrounds = ["yellowgreen", "orange", "tomato"];
    var data = props.data;
    // console.log(data)
    var onJoinRoom = props.onClick;
    return (
        <div className="sub" onClick={() => {onJoinRoom(data);}}>
            <div className="sub-sta" style={{background: backgrounds[data.TrangThaiID],}} >
                {data.TrangThai}
            </div>

            <div className="sub-save">
                <ion-icon name="star-outline"></ion-icon>
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

function SlideBar(props) {

    const tabOnOff = (e) => {
        const ele = e.target;
        
        var par = ele.parentElement;
        try {
            while (!par.classList.contains('slide-bar-li')) {
                var par = par.parentElement;
            }

            var ele_1 = par.querySelector(".slide-bar-li-chill")
            if (ele_1.classList.contains('on')) {
                ele_1.classList.remove('on')
            }
            else {
                ele_1.classList.add('on')
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="slide-bar-connet">
            <div className="slide-bar-top">
                <div className="slide-bar-li">
                    <div className="slide-bar-li-title" onClick={tabOnOff}>
                        <ion-icon name="home"></ion-icon>
                        <p>Phòng học</p>
                        <div className="slide-bar-end">
                            <ion-icon name="caret-down"></ion-icon>
                        </div>
                    </div>

                    <div className="slide-bar-li-chill">
                        <li className={classhscp.handleChangePhongSel.contains(0) ? 'on' : ''} onClick={() => {
                            classhscp.ListSubChange(0)
                        }}>
                            <p>Đang diễn ra</p>
                        </li>
                        <li className={classhscp.handleChangePhongSel.contains(1) ? 'on' : ''} onClick={() => {
                            classhscp.ListSubChange(1)
                        }}>
                            <p>Chưa bắt đầu</p>
                        </li>
                        <li className={classhscp.handleChangePhongSel.contains(2) ? 'on' : ''} onClick={() => {
                            classhscp.ListSubChange(2)
                        }}>
                            <p>Đã kết thúc</p>
                        </li>
                    </div>
                </div>

                <div className="slide-bar-li">
                    <div className="slide-bar-li-title" onClick={tabOnOff}>
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
                    <div className="slide-bar-li-title" onClick={tabOnOff}>
                        <ion-icon name="contrast"></ion-icon>
                        <p>Theme</p>
                        <div className="slide-bar-end">
                            <ion-icon name="caret-down"></ion-icon>
                        </div>
                    </div>

                    <div className="slide-bar-li-chill">
                        <li onClick={() => {setTheme('light')}} className={Setting.theme == 'light' ? 'on' : ''}>
                            <p>Light mod</p>
                        </li>
                        <li onClick={() => {setTheme('dark')}} className={Setting.theme == 'dark' ? 'on' : ''}>
                            <p>Dark mod</p>
                        </li>
                        <li onClick={() => {setTheme('system')}} className={Setting.theme == 'system' ? 'on' : ''}>
                            <p>System mod</p>
                        </li>
                    </div>
                </div>

                <div className="slide-bar-li">
                    <div className="slide-bar-li-title">
                        <ion-icon name="calendar-clear-outline"></ion-icon>
                        <p>Thời khóa biểu</p>
                    </div>
                </div>
            </div>
            <div className="slide-bar-bottom">
                <div className="slide-bar-li">
                    <div className="slide-bar-li-title" >
                        {/* <ion-icon name="bar-chart"></ion-icon> */}
                        <div className="slide-bar-tar" onClick={() => {logOut()}}>
                            <ion-icon name="log-out-outline"></ion-icon>
                            <p>Đăng xuất</p>
                        </div>
                        <div className="slide-bar-setting" onClick={() => {console.log('setting'); SettingInitRender()}}>
                            <ion-icon name="settings-sharp"></ion-icon>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function ListSub(props) {
    const Classhscp = props.Classhscp;
    const arrView = Classhscp.handleSort(Classhscp.arrListPhongHocView , null)
    return (
        <React.Fragment>
            <div className="list-sub">
                <div className="list-div-left">
                    <Filter
                        onClick={Classhscp.handleFilter}
                        slideBar={Classhscp.handlslideBar}
                        data={Classhscp}
                    />
                    <div className="lis-sub-bottom">
                        <div className="sub-view" onResize={(e) => {console.log(e);}}>
                            {arrView.map((e, index) => ( <Sub key={index} data={e} onClick={Classhscp.JoinRoom} /> ))}
                        </div>
                    </div>
                </div>
                <div className="slide-bar" id="listPhongSlideBar">
                    <SlideBar/>
                </div>
            </div>


        </React.Fragment>
    );
}
