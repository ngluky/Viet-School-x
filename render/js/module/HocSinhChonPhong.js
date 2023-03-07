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
    this.arrListPhongHoc = []

    this.handleChangePhongSel = {
        add : (e) => {
            var va = this.LoaiPhongSelected.push(e);
            this.Get_DsPhongHocServer()
            return va;
        },
        remove : (index) => {
            var va = this.LoaiPhongSelected.splice(index , 1);
            this.Get_DsPhongHocServer()
            return va;
        },

        contains : (e) => {
            return this.LoaiPhongSelected.includes(e);
        }
    }

    this.handleFilter = (sub , event) => {
        console.log(sub)
        var newArray = this.arrListPhongHoc.filter((e) => e.TenMon == sub)

        const Target = event.target;
        
        document.querySelectorAll('.filter-button').forEach((e) => e.classList.remove('sel'))
        Target.classList.add('sel')

        if (newArray.length == 0)
            newArray = this.arrListPhongHoc;

        var arrChildren = [];
        newArray.forEach(e => {
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

    this.Get_DsPhongHocServer = () => {
        this.arrListPhongHoc = []
        this.LoaiPhongSelected.forEach(e => {
            WSGet(function (result) {
                var Data = result.Data.getTable("Data").toJson();
                console.log(Data)
                Data.forEach(e => {
                    this.arrListPhongHoc.push(e)
                })
                Root.render(React.createElement(ListSub , {
                    Classhscp: this
                }))
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

        this.Get_DsPhongHocServer();
    }
}