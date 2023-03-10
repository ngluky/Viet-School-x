
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
    this.editortuluanid = '#editor-bailam-tuluan' + Math.random().toString().substring(2);
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
    this.dataTab = {}
    this.isSideBar = true
    this.isOnTap = false


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

    this.slideBarTool = [
        {
            title: 'Thành viên',
            iconName: 'people-outline',
            onClick: () => { console.log('tv') }
        },
        {
            title: 'chat',
            iconName: 'chatbox-outline',
            onClick: () => { console.log('chat') }
        },
        {
            title: 'Câu hỏi',
            iconName: 'checkbox-outline',
            onClick: () => { console.log('chat') }
        }

    ]

    this.handlSideBar = {
        isSideBar: () => this.isSideBar,

        out: () => {
            this.rootChat = null
            this.rootContent = null
            this.arr_Data = []
            classttn.resetFieldTracNghiem()
            clearInterval(_Ttn_Timer);
            this.outRoom()
        },

        baiHoc: () => {
            if (!classhtt.rootContent) {
                classhtt.rootContent = ReactDOM.createRoot(document.getElementById('content'))
            }
            clearInterval(_Ttn_Timer);
            document.querySelector(".phonghoc-content-top").classList.remove('baitap')
            document.querySelector('#side-bar div.chat-top').classList.remove('baitap')
            this.rootContent.render(React.createElement(BaiHoc))

        },

        baiTap: () => {
            if (!this.rootContent) {
                this.rootContent = ReactDOM.createRoot(document.getElementById('content'))
            }

            classhtt.rootContent.render(React.createElement(BaiTap, {
                classttn: classttn
            }))

            if (classttn.arr_Data.length > 0) {
                console.log("no dow")
                setTimeout(() => {
                    _Ttn_Timer = setInterval(function () {
                        this.second_Bailam++;
                        var ThoiGianLamBai_Client = parseInt((new Date() - this.GioBatDauLamBai_Client) / 1000); // giay
                        this.second_Bailam_TruocDongBo = this.second_Bailam;

                        if (this.second_Bailam >= this.limit_minute * 60) {/*classhtt.isKiemTra && */
                            this.isConThoiGianLamBai = false;
                            // clearInterval(_Ttn_Timer);

                            console.log("time end")
                        }

                        this.isConThoiGianLamBai = true;
                        var thoigianconlai = this.limit_minute * 60 - this.second_Bailam;
                        var str = formatTime(Math.floor(thoigianconlai))
                        console.log(str)
                        document.getElementById('bottom-timer').textContent = str;
                    }.bind(classttn), 1000)
                    classttn.readerCauhoi()
                    var thoigianconlai = classttn.limit_minute * 60 - classttn.second_Bailam;
                    var str = formatTime(Math.floor(thoigianconlai))
                    // console.log(str)
                    document.getElementById('bottom-timer').textContent = str;
                }, 10)
            }
            else {
                this.getBaiTap(() => {
                    classttn.initTimer()
                    classttn.readerCauhoi()
                })
            }

            document.querySelector(".phonghoc-content-top").classList.add('baitap')
            document.querySelector('#side-bar div.chat-top').classList.add('baitap')
        },

        chatOnOff: (on) => {
            this.isSideBar = !on;
            const ele = document.getElementById('side-bar')
            if (!on) {
                ele.classList.remove('off');
                ele.style = {}
            }

            else {
                ele.classList.add('off');
                ele.style.width = "0px"
                ele.style.margin = "0"
                ele.style.opacity = "0";
            }
        }

    }

    this.getBaiTap = (callback) => {
        WSGet(function (result) {
            // df_HideLoading();
            try {
                if (CheckResult(result)) {
                    let arrGio = result.Data.getTable('GioHienHanh').toJson();
                    this.GioHienHanh = arrGio[0].GioHienHanh.replace(" ", "T");
                    this.GioHienHanhClient = new Date();
                    if (result.Data.getTable('HoanVi'))
                        classttn.arr_HoanVi = result.Data.getTable('HoanVi').toJson();
                    if (classttn.arr_HoanVi == undefined || classttn.arr_HoanVi.length == 0) {
                        classttn.errorChangeCauHoi = 'Không tải được bảng hoán vị, vui lòng liên hệ giáo viên dạy bạn.';
                        // showMsg('Thông báo lỗi', classttn.errorChangeCauHoi);
                        return false;
                    }
                    if (result.Data.getTable('DoanVan'))
                        classttn.arr_DoanVan = result.Data.getTable('DoanVan').toJson();
                    var arr_DapAn = [];
                    if (result.Data.getTable('DapAn'))
                        arr_DapAn = result.Data.getTable('DapAn').toJson();
                    var arr_DapAn_CauHoiID = convertJson2Array(arr_DapAn, 'CauHoiID');
                    if (result.Data.getTable('CauHoi')) {
                        var arr_Cauhoi_temp = result.Data.getTable('CauHoi').toJson();
                        var arr_Cauhoi = [];
                        if (arr_Cauhoi_temp.length > 0) {
                            for (var ch = 0; ch < arr_Cauhoi_temp.length; ch++) {
                                var value = arr_Cauhoi_temp[ch];

                                var item = {};
                                item.SoDapAn = value.SoDapAn;
                                item['cauhoiid'] = value.CauHoiID;
                                item['cauhoi'] = value.NoiDungCauHoi;
                                item['doanvan'] = value.DoanVanID;
                                item['dapan'] = [];
                                item['tracnghiem'] = value.TracNghiem;
                                if (value.TracNghiem) {
                                    var pos = arr_DapAn_CauHoiID.indexOf(item['cauhoiid']);
                                    if (pos == -1) {
                                        arr_Cauhoi = [];
                                        classttn.errorChangeCauHoi = 'Giáo viên đã thay đổi dữ liệu câu hỏi. Vui lòng liên hệ giáo viên để làm mới bài tập! Nội dung câu hỏi có thay đổi: ' + item['cauhoi'];
                                        // showMsg('Thông báo lỗi', classttn.errorChangeCauHoi);
                                        return false;
                                    }
                                    var arr_HoanViID = convertJson2Array(classttn.arr_HoanVi, 'HoanViID');
                                    var poshv = arr_HoanViID.indexOf(value.HoanViID);
                                    var arr_HoanVi_CH = [];
                                    if (poshv != -1) {
                                        for (var i = 0; i < 4; i++) {
                                            arr_HoanVi_CH.push(classttn.arr_HoanVi[poshv + i]);
                                        }
                                    }
                                    var arr_DapAn_Temp = [];
                                    for (var i = pos; i < pos + item.SoDapAn; i++) {
                                        if (arr_DapAn_CauHoiID[i] == item['cauhoiid'])
                                            arr_DapAn_Temp.push(arr_DapAn[i]);
                                    }

                                    if (arr_HoanVi_CH.length >= item.SoDapAn && arr_DapAn_Temp.length == item.SoDapAn) {
                                        for (var j = 0; j < arr_HoanVi_CH.length; j++) {
                                            for (var i = 0; i < arr_DapAn_Temp.length; i++) {
                                                if (arr_DapAn_Temp[i].STTDapAn == arr_HoanVi_CH[j].STTDapAn) {
                                                    item['dapan'].push({ 'stt': j, 'noidung': arr_DapAn_Temp[i].NoiDung });
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        classttn.errorChangeCauHoi = 'HTT: Câu hỏi không đủ số lượng đáp án, vui lòng liên hệ giáo viên để kiểm tra lại. Nội dung câu hỏi:' + item['cauhoi'];
                                        // showMsg('Thông báo lỗi', classttn.errorChangeCauHoi);
                                        return false;
                                    }
                                }
                                item['hoanvi'] = value.HoanViID;
                                arr_Cauhoi.push(item);
                            }
                        }
                        classttn.arr_Data = arr_Cauhoi;

                    }
                    if (result.Data.getTable('BaiLam')) {
                        classttn.arr_Bailam = result.Data.getTable('BaiLam').toJson();
                    }
                    if (result.Data.getTable('BHHS')) {
                        var BHHS = result.Data.getTable('BHHS');
                        if (BHHS) {
                            var datas = BHHS.toJson();
                            if (datas.length > 0) {
                                classhtt.arr_BHHS = datas[0];
                                classttn.GioHienHanh = classhtt.arr_BHHS['GioHienHanh'].replace(" ", "T");
                            }
                        }
                        else
                            classhtt.arr_BHHS = [];
                        // không có BHHS
                    }
                    if (classhtt.arr_Data_BaiHoc['TGKT'] == undefined) {
                        // showMsg('Thông báo lỗi', "Không thể lấy được thời gian kết thúc bài học, Hãy vào phòng lại hoặc làm tươi (F5) trang web.", 'OK', 'error', function () { return; });
                    }
                    else {
                        classhtt.tinhThoiGianLamBai();
                        if (callback)
                            callback(result);
                    }


                }
                else {
                    if (!classhtt.isGV) {
                        if (result.ErrorMessage == "ElearningInitCauHoi_Upgade : Bài này không có bài tập.") {
                            classttn.arr_Data = [];
                            if (callback)
                                callback(result);
                        }
                        else {
                            // window.location.href = '/#/HocSinhChonPhong/' + classhtt.LoaiPhongHoc;
                            // loadpage('#/HocSinhChonPhong/' + classhtt.LoaiPhongHoc);
                            // clearInterval(_Htt_Timer);
                            // clearInterval(_Ttn_Timer);
                        }
                    }
                }
            }
            catch (error) {
                // showMsg('Thông báo lỗi', error, 'OK', 'error', function () { return; });
            }
        }.bind(this), classhtt.DLL_LearningRoom, 'ElearningInitCauHoi_Upgade', classhtt.BaiHocGiaoVienID, classhtt.BaiHocLopID, this.StoreMode);
    }

    this.outRoom = () => {
        console.log('ok')
        WSGet(function () {
            console.log('ok')
            classhscp.renderInit()
        }.bind(this), "Elearning.Core.RoomManager", "OutRoom", this.BaiHocGiaoVienID.toString())
    }

    this.renderInit = () => {
        checkloggin()
        Root.render(React.createElement(PhongHoc, {
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
        df_ShowLoading('đang tải dữ liệu')
        this.BaiHocGiaoVienID = data.BaiHocGiaoVienID.toString();
        this.BaiHocLopID = data.BaiHocLopID.toString();
        this.LoaiPhongHoc = data.TrangThaiID;
        this.arr_Data_BaiHoc = data
        this.isOnTap = data.VaoPhong == "Ôn Tập" ? true : false
        ws.registerOnMessageFunction(this, this.socketMessage);
        this.renderInit()
        this.joinRoomIfYes(() => {
            this.getBaiHoc(() => {
                df_HideLoading()
            })
        })


    }

    this.tinhThoiGianLamBai = function () {
        this.GioClient_LucLayCauHoi = new Date();
        classttn.GioBatDauLamBai_Client = this.GioClient_LucLayCauHoi;
        classttn.second_Bailam = 0;
        var t_TGKT = new Date(this.arr_Data_BaiHoc['TGKT'].replace(" ", "T"));
        var t_TGHH = new Date(this.GioHienHanh);
        var timespan = (t_TGKT - t_TGHH) / 60000; //phut

        // Nếu là kiểm tra thì bước này load Bài kiểm tra lên để lấy SoGiayLamBai
        if (!this.arr_BHHS['SoGiayLamBai'] || this.arr_BHHS['SoGiayLamBai'] == 0
            || !this.arr_Data_BaiHoc.SoPhutLamBai || this.arr_Data_BaiHoc.SoPhutLamBai == 0) { // chưa làm bài
            if (this.arr_Data_BaiHoc.SoPhutLamBai && this.arr_Data_BaiHoc.SoPhutLamBai != 0) {
                if (this.arr_Data_BaiHoc.SoPhutLamBai < timespan)
                    classttn.limit_minute = this.arr_Data_BaiHoc.SoPhutLamBai;
                else
                    classttn.limit_minute = timespan;
            }
            else {
                if (timespan > 0)
                    classttn.limit_minute = timespan;// SV_TGKT- SV_TGHH
            }
        }
        else {//xet neu co gio vao roi, thì lấy sophutlambai(neu co) tru di so giay da lam => ra duoc so giay quy dinh
            var sophutquydinh = this.arr_Data_BaiHoc.SoPhutLamBai - this.arr_BHHS['SoGiayLamBai'] / 60;
            if (sophutquydinh > 0) {
                if (sophutquydinh < timespan)
                    classttn.limit_minute = sophutquydinh;
                else
                    classttn.limit_minute = timespan;
            }
            else {
                classttn.limit_minute = 0;// Hết giờ
            }
        }
        var GioVao = moment(this.arr_BHHS.GioVao, 'DD/MM/yyyy HH:mm:ss');
        var HienHanh = new Date(this.arr_BHHS.GioHienHanh);
        this.Log_SoGiayBatDau = parseInt((HienHanh - GioVao) / 1000);
        classttn.LSLamBai = ''

    }
}