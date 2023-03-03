
function HocTrucTuyen() {
    this.BaiHocGiaoVienID = null;
    this.BaiHocID;
    this.DLL_LearningRoom = "Elearning.Core.LearningRoom";
    this.DLL_Login = "Elearning.Core.Login";
    this.DLL_File = "Elearning.Core.FileManager";
    this.arr_Data_Online = [];
    this.arr_Lop_Online = [];
    this.arr_HS_Online = [];
    this.arr_Data_Chat = [];
    this.arr_Data_BaiHoc = {};
    this.arr_BHHS = [];
    this.arr_LockComment = [];
    this.DsLop_ThanhVien = [];
    this.LopID_ThanhVien_Act = null;
    this.tabActive = '#div-editor';
    this.arrCauHinhPDF = {};
    this.dtsCauHoi;
    this.dgvBaiHoc_CauHoi = null;
    this.MappingID2Char = ['A', 'B', 'C', 'D'];
    this.isKiemTra = false;
    this.lockBaiHoc = false;
    this.lockKiemTra = false;
    this.pageChat = 0;
    this.IsLoadLive = false;
    this.IsLoadChat = false;
    this.BaiHocLopID = null;
    this.LoaiPhongHoc = 0;
    this.LinkHopTrucTuyen = null;
    this.StoreMode = "0"; //0: bài học mới, 1: Bài học cũ
    this.ChoHSChamDiem = false;
    this.CountCheckGioClient = 0;
    this.GioClient_LucLayCauHoi;
    this.GS_BaiHocHSIDs = [];
    this.GS_BatGiamSat = false;
    this.GS_BatGiamSatWeb = false;
    this.GS_DSHSs = [];
    this.GS_Mode = 1;
    this.GS_Timmer;
    this.GS_LanCuoiCapNhat;
    this.GS_TreeView;
    this.Log_SoGiayBatDau = 0;
    this.fgViPham1HS;
    this.GS_BaiHocHSID_ChiTiet;
    this.GS_HocSinhID_ChiTiet;
    this.LopID;
    this.GS_HocSinhCamera = [];
    this.isLoadBaiTap = false;
    this.classGiamSatWeb;
    this.rootContent = null;
    this.rootChat = null;

    this.getBaiHoc = (callback) => {
        WSGet(function (result) {

            if (result.Data.getTable('GioHienHanh')) {

                let arrGio = result.Data.getTable('GioHienHanh').toJson();
                this.GioHienHanh = arrGio[0].GioHienHanh.replace(" ", "T");
                this.GioHienHanhClient = new Date();
                if (result.Data.getTable('BaiHoc'))
                    this.arr_Data_BaiHoc = result.Data.getTable('BaiHoc').toJson();

                if (this.arr_Data_BaiHoc.length > 0) {
                    this.arr_Data_BaiHoc = this.arr_Data_BaiHoc[0];

                    if (this.arr_Data_BaiHoc['LaKiemTra'])
                        this.isKiemTra = true;
                    if (this.arr_Data_BaiHoc['ChoCameraGiamSat'])
                        this.GS_BatGiamSat = true;
                    if (this.arr_Data_BaiHoc['ChoWebGiamSat'])
                        this.GS_BatGiamSatWeb = true;
                    if (this.arr_Data_BaiHoc['TGKT']) // TGKT not null
                    {
                        if (this.arr_Data_BaiHoc.ChoHienBaiGiai)
                            this.isBaiGiai = true;

                        this.BaiHocID = this.arr_Data_BaiHoc['BaiHocID'].toString();
                        this.lockBaiHoc = this.arr_Data_BaiHoc['KhongHienBaiHoc'];
                        this.lockKiemTra = this.arr_Data_BaiHoc['KhongHienBaiTap'];
                        if (!this.lockBaiHoc && !this.isKiemTra) {
                            this.setContent(this.arr_Data_BaiHoc['NoiDungBaiHoc']);
                            this.ChoHSChamDiem = this.arr_Data_BaiHoc["ChoHSChamDiem"];
                        }
                    }
                }

            }

            else {
                console.log('lỗi lấy bài học')
            }

            if (callback) callback()
        }.bind(this), this.DLL_LearningRoom, 'ElearningInit', this.BaiHocGiaoVienID, this.StoreMode)
    }

    this.setContent = (data) => {

        document.getElementById("noidungbaihoc").innerHTML = data;
        
    }

    this.handlSideBar = {
        out: () => {
            this.outRoom()
        },

        baiTap: () => {

        }

    }

    this.getBaiTap = () => {
        WSGet(function (result) {

        }.bind(this), classhtt.DLL_LearningRoom, 'ElearningInitCauHoi_Upgade', classhtt.BaiHocGiaoVienID, classhtt.BaiHocLopID, this.StoreMode);
    }

    this.outRoom = () => {
        console.log('ok')
        WSGet(function () {
            console.log('ok')
            classhscp.renderInit()
        }.bind(this) , "Elearning.Core.RoomManager", "OutRoom", this.BaiHocGiaoVienID.toString())
    }

    this.renderInit = () => {
        checkloggin()
        Root.render(React.createElement(PhongHoc , {
            classhtt: this
        }))
    }

    this.joinRoomIfYes = (callback) => {
        WSGet(function (rs1) {
            console.log(rs1)
            if (callback)
                callback()
        }.bind(this), 
        this.DLL_LearningRoom, 
        'ElearningCheckRoom', this.BaiHocGiaoVienID.toString(), 
        (df_unnu(this.BaiHocLopID) ? "" : this.BaiHocLopID.toString()), 
        (this.isKiemTra ? "1" : "0"), 
        this.StoreMode, 
        df_DateTime_SQL(new Date))
    }

    this.socketMessage = (ms) => {
        console.log(ms)
    }

    this.joinRoom = (data) => {
        this.BaiHocGiaoVienID = data.BaiHocGiaoVienID.toString();
        this.BaiHocLopID = data.BaiHocLopID.toString();
        this.LoaiPhongHoc = data.TrangThaiID;
        this.arr_Data_BaiHoc = data
        ws.registerOnMessageFunction(this, this.socketMessage);
        this.renderInit()
        this.joinRoomIfYes(() => {
            this.getBaiHoc(() => {
    
            })
        })


    }
}