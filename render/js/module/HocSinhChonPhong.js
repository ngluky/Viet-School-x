function HocSinhChonPhong() {
    this.DLL = "Elearning.Core.Learning";
    this._Counter = 0;
    this._ButtonCooldownInterval;
    this.LoaiPhongSelected = [0];//1: Chưa bắt đầu, 2: Da ket thuc, 0 đang diễn ra, 3: phòng cũ
    this.LopID_Selected;
    this.fgDsPhong = null;
    this.cookieDSPH = [0, 0, 0, 0];
    this.arr_HoanVi;
    this.gridHeight = 600;
    this.StoreMode = "0";
    this.arrCauHinhPDF = [];
    this.BaiHocs = null;
    this.root = null;
    this.arrListPhongHoc = [];

    this.arrListPhongHocView = [];
    this.arrListFilterMon = [];
    this.lastSort = ""
    this.handleChangePhongSel = {
        add : (e) => {
            if (this.LoaiPhongSelected.includes(e)) return this.LoaiPhongSelected.length
            var va = this.LoaiPhongSelected.push(e);
            this.Get_DsPhongHocServer(() => {
                Root.render(React.createElement(ListSub , {
                    Classhscp: this
                }))
            })
            return va;
        },
        remove : (e) => {
            if (this.LoaiPhongSelected.length == 1) return

            if (this.LoaiPhongSelected.includes(e)) {
                var va = this.LoaiPhongSelected.splice(this.LoaiPhongSelected.indexOf(e) , 1);
                this.Get_DsPhongHocServer(() => {
                    Root.render(React.createElement(ListSub , {
                        Classhscp: this
                    }))
                })
                return va;
            }
        },

        contains : (e) => {
            return this.LoaiPhongSelected.includes(e);
        }
    }

    this.ListSubChange = (id) => {

        console.log(id)

        if (this.handleChangePhongSel.contains(id)) {
            if (this.LoaiPhongSelected.length == 1) return
            this.handleChangePhongSel.remove(id)
        }
        else {
            this.handleChangePhongSel.add(id)
        }

        const ele = document.querySelectorAll('div.slide-bar-li-chill.on > li')[id]
        if (ele.classList.contains('on')) {
            ele.classList.remove('on')
        }
        else {
            ele.classList.add('on')
        }
    }

    this.handlReSize = (e) => {
        console.log(e)
    }

    this.handlslideBar = () => {
        const ele = document.getElementById('listPhongSlideBar');
        const listSub = document.querySelector('.list-div-left')
        if (ele.classList.contains('on')) {
            ele.classList.remove('on')
            ele.style.width = "0px"
            ele.style.opacity = '0'
            listSub.style.width = "calc(100%)"
            // display: none;
        }
        else {
            ele.classList.add('on')
            ele.style.width = "200px"
            ele.style.opacity = '1'
            listSub.style.width = "calc(100% - 200px)"
        }
    }

    this.clearFilterSub = () => {
        this.arrListFilterMon = []
        this.updateViewSub(this.arrListPhongHoc)
    }

    this.handleSort = (arr , pro, autuUpdate = false) => {
        
        if (pro != this.lastSort) {
        }
        else {
            this.lastSort = ""
        }
        if (!autuUpdate) {
            var copyArr = [...arr]
    
                if (!pro) pro = this.lastSort;
    
                copyArr.sort((a , b) => {
                    if (a[pro] < b[pro] ) return -1
                    else if (a[pro] > b[pro]) return 1
                    else return 0
                } )
            
            return copyArr
        }
        else {
            this.lastSort = pro
            this.updateViewSub(copyArr)
        }
        
    }

    this.changeFilterMon = (mon , autoUpdate = false) => {
        if (!mon) {
            
        }
        else if (this.arrListFilterMon.includes(mon)) {
            var index = this.arrListFilterMon.indexOf(mon);
            this.arrListFilterMon.splice(index, 1)
        }
        else {
            this.arrListFilterMon.push(mon)
        }

        var copyArr = []
        if (this.arrListFilterMon.length == 0) {
            copyArr = this.arrListPhongHoc
            this.arrListPhongHocView = copyArr
        }
        else {
            this.arrListPhongHoc.forEach(e => {
                if (this.arrListFilterMon.includes(e.TenMon)) 
                    copyArr.push(e)
            })
            this.arrListPhongHocView = copyArr
        }

        if (autoUpdate)
            this.updateViewSub(copyArr)
        else 
            return copyArr
    }

    this.updateViewSub = () => {

        var copyArr = [...this.arrListPhongHoc]
        copyArr = this.changeFilterMon(null)
        copyArr = this.handleSort(copyArr , this.lastSort , false)

        var arrChildren = [];
        copyArr.forEach(e => {
            arrChildren.push(React.createElement(Sub , {
                data: e,
                onClick: this.JoinRoom
            }))
        })

        const newListSub = React.createElement(React.Fragment , null , ...arrChildren)
            
        if (!this.root)
        {
            const subContainer = document.querySelector(".sub-view")
            this.root = ReactDOM.createRoot(subContainer)
        }
        this.root.render(newListSub)
    }

    this.renderInit = () => {
        checkloggin(() => {
            this.root = null
            Root.render(React.createElement(ListSub , {
                Classhscp: this
            }))
        })
    }

    this.Get_DsPhongHocServer = (callBack) => {
        this.arrListPhongHoc = []
        var count = this.LoaiPhongSelected.length
        this.LoaiPhongSelected.forEach(e => {
            WSGet( function(result) {
                var Data = result.Data.getTable("Data").toJson();
                console.log(Data)
                Data.forEach(e => {
                    this.arrListPhongHoc.push(e)
                })

                count -= 1

                if (count == 0) {
                    this.arrListPhongHocView = [...this.arrListPhongHoc]
                    if (callBack) callBack();
                }

            }.bind(this), this.DLL, "GetHSPhongHoc", e.toString());
        })
    }

    this.JoinRoom = (data) => {
        classttn = new ThiTracNghiem();
        console.log(data)
        classhtt.joinRoom(data)
    }

    this.init = () => {
        Root.render(React.createElement('div' , {
            className: "HocSinhChonPhong",
        }))

        this.Get_DsPhongHocServer(() => {
            Root.render(React.createElement(ListSub , {
                Classhscp: this
            }))
        });
    }
}