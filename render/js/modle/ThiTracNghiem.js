
function ThiTracNghiem() {
    this.now_slide = 1;
    this.arr_Data = [];
    this.arr_DoanVan = [];
    this.arr_Bailam = [];
    this.arr_Dapan_Dung = [];
    this.arr_HoanVi = [];
    this.limit_minute = 0; // mặc định
    this.second_Bailam = 0;
    this.second_Bailam_TruocDongBo = 0;
    this.next_prev = '';
    this.DLL = "Elearning.Core.LearningRoom";
    this.isNopBai = false;
    this.isBaiGiai = false;
    this.isBaiOnTap = 0;
    this.owlTracNghiem;
    this.allowChangeSlide = true;
    this.dtSave = new DataTable();
    this.dtSave.Columns.add('ID_Save', 'String');
    this.dtSave.Columns.add('CauHoiID', 'String');
    this.dtSave.Columns.add('NoiDungBaiLam', 'String');
    this.dtSave.Columns.add('STTDapAn', 'String');
    this.saveID = 0;
    this.myVarTimer = undefined;
    this.timeOut = false;
    this.GioHienHanh = '';
    this.GioBatDauLamBai_Client;
    this.errorChangeCauHoi = '';
    this.AndrWebView = false;
    this.CauHoiDapAn_Height = 1000;
    this.TimeEnd = null;
    this.lostfc = false;
    this.timelostfc = null;
    this.timecount = 0;
    this.timeenable = false;
    this.isConThoiGianLamBai = false;
    this.countInactive = 0;
    this.chdaHeight = 1000;
    this.doanvan_cauhoi = [];
    this.tuLuanHeight = 200;
    this.TyleDapAn = 0.5;
    this.Diachitemp = '';
    this.BaiHocLopID = "-1";
    this.classImgView;
    this.BaiHocHSID;
    this.IsRegisterSuccess;
    this.LSLamBai;
    this.LastTimeViPham;
    this.SoLanViPham_NopBaiWeb = 0;
    this.LyDoNopBai = '';

    this.readerCauhoi = function () {
        if (!classhtt.rootContent) {
            classhtt.rootContent = ReactDOM.createRoot(document.getElementById('content'))
        }

        classhtt.rootContent.render(React.createElement(BaiTap))

    }

	this.updateBaiLam = function(cau , dapan) {
        if (!this.isConThoiGianLamBai || this.isNopBai) {
            // showMsg('Thông báo', (this.isNopBai ? 'Bạn đã nộp bài' : 'Đã qua thời gian cho phép làm bài') + '. Không thể chọn đáp án hoặc lưu bài!', 'OK', 'error', function () { return; });
            return false;
        }

        var now_cauhoi = this.arr_Data[cau - 1];
        var arr_Cau_dalam = convertJson2Array(this.arr_Bailam, 'cau');
        var pos = arr_Cau_dalam.indexOf(cau);
        if (pos != -1 && now_cauhoi.tracnghiem && this.arr_Bailam[pos].dapan == dapan) {
            return; // câu trắc nghiệm không đổi đáp án
        }

        var item = {};
        item['cau'] = cau;
        if (now_cauhoi.tracnghiem)
            item['dapan'] = dapan;
        else {
            item['dapan'] = 'Tự luận';
            var content = this.getBaiLam_TuLuan();
            if (content != null)
                item['noidung'] = content;
        }
        item['isdaluu'] = false;

        if (pos != -1) {
            item['xemlai'] = this.arr_Bailam[pos]['xemlai'];
            this.arr_Bailam[pos] = item;
        }
        else
            this.arr_Bailam.push(item);

        arr_Cau_dalam = convertJson2Array(this.arr_Bailam, 'cau');
        pos = arr_Cau_dalam.indexOf(cau);

        this.saveBailam(!now_cauhoi.tracnghiem);

        var arr_Cau_dalam = convertJson2Array(this.arr_Bailam, 'cau');
        var pos = arr_Cau_dalam.indexOf(this.now_slide);
        var dapan = null, noidung = null;
        if (pos != -1) {
            if (this.arr_Bailam[pos]['dapan'] && this.arr_Bailam[pos]['dapan'] != 'Tự luận')
                dapan = this.arr_Bailam[pos]['dapan'];
            else if (this.arr_Bailam[pos]['noidung']) {
                noidung = this.arr_Bailam[pos]['noidung'];
            }
        }

        var cauhoi = this.arr_Data[this.now_slide - 1];
        var stt = undefined;
        if (dapan == 'A')
            stt = cauhoi.dapan[0].stt.toString();
        else if (dapan == 'B')
            stt = cauhoi.dapan[1].stt.toString();
        else if (dapan == 'C')
            stt = cauhoi.dapan[2].stt.toString();
        else if (dapan == 'D')
            stt = cauhoi.dapan[3].stt.toString();

        if (classhtt.arr_Data_BaiHoc.ChoHoanVi) {
            if (cauhoi.hoanvi && cauhoi.hoanvi != 0) {
                var arr_HoanViID = convertJson2Array(this.arr_HoanVi, 'HoanViID');
                var pos = arr_HoanViID.indexOf(cauhoi.hoanvi);
                if (pos != -1) {
                    var arr_HoanVi_CH = [];
                    for (var i = 0; i < 4; i++) {
                        arr_HoanVi_CH.push(this.arr_HoanVi[pos + i]);
                    }
                    var arr_HoanViID_fill = convertJson2Array(arr_HoanVi_CH, 'STT');
                    var pos1 = arr_HoanViID_fill.indexOf(parseInt(stt));
                    if (pos1 != -1) {
                        stt = arr_HoanVi_CH[pos1]['STTDapAn'].toString();
                    }
                }
            }
        }

        var r = this.dtSave.select(function (r) { return r.getCell("CauHoiID") == cauhoi.cauhoiid.toString() });
        if (r.length === 0) {
            this.dtSave.Rows.add(0, cauhoi.cauhoiid.toString(), noidung, stt);
        }
        else {
            r[0].setCell('STTDapAn', stt);
            r[0].setCell('NoiDungBaiLam', noidung);
        }
        // this.doSave(IsThuCong);
    }

    this.getBaiLam_TuLuan = function(showmessage = true) {
        var tuluan = null;
        if (this.AndrWebView) {
            var text = $(classhtt.editortuluanid).html();
            tuluan = text;
        }
        else
            tuluan = tinymce.get(classhtt.editortuluanid.substring(1)).getContent();
        if (tuluan.length > 1048576) {
            if (showmessage)
                // showMsg('Thông báo lỗi', 'Nội dung tự luận không được vượt quá 1 Mb dữ liệu, nếu bạn có chèn hình ảnh vui lòng xóa đi và sử dụng nút Upload file trên thanh công cụ để chèn hình ảnh chứ đừng copy - paste trực tiếp.', 'Đồng ý', 'error');
            return null;
        }
        else return tuluan;
    }

    this.doSave = function() {

    }
	this.writeLog = function() {
        WSDBGet(function (rs) {
            //df_HideLoading();
            //if (CheckResult(rs)) {
            //
            console.log("Ghi log " + rs.ErrorNumber)
            //}
        }.bind(this), "HS.TTN.WriteLog", "BaiHocHSID", this.BaiHocHSID.toString(), "ThoiGianLamBai_Client", ThoiGianLamBai_Client.toString(), "second_Bailam", this.second_Bailam_TruocDongBo.toString(), "GioHienHanh_Server", df_DateTime_SQL(new Date(this.GioHienHanh)), "GioHienHanh_Client", df_DateTime_SQL(classttn.GioBatDauLamBai_Client), "limit_minute", this.limit_minute.toFixed(2), "SoGiayLamBai", (df_unnu(classhtt.arr_BHHS.SoGiayLamBai) ? "0" : classhtt.arr_BHHS.SoGiayLamBai.toString()), "GioClient_LucLayCauHoi", df_DateTime_SQL(classhtt.GioClient_LucLayCauHoi), "GioClient_LucGoiHamLuu", df_DateTime_SQL(new Date()), "IsKiemTra", classhtt.isKiemTra, "LyDoNopBai", LyDoNopBai);

    }

    this.resetFieldTracNghiem = function() {
        this.TimeEnd = null;
        this.timeOut = false;
        this.isNopBai = false;
        this.allowChangeSlide = true;
        this.lostfc = false;
        this.timelostfc = null;
        this.timecount = 0;
        this.isBaiGiai = false;
        this.LyDoNopBai = '';
    }

    this.lamBaiLai = function() {
        if (isLamLai) {
            showConfirm("Làm bài lại - bảo lưu", "Khi làm bài lại:<br/>- Các câu hỏi,đáp án, vị trí câu hỏi và đáp án vẫn được bảo lưu.<br/>- Thời gian sẽ được bắt đầu lại.", 'Đồng ý', 'Bỏ qua', function () {
                df_ShowLoading();
                WSDBGet(function (rs) {
                    df_HideLoading();
                    if (CheckResult(rs)) {
                        var code = rs.Data.Tables[0].Rows[0].getCell('Code');
                        var KetQua = rs.Data.Tables[0].Rows[0].getCell('KetQua');
                        if (code == true || code == 1) {
                            showMsg("Thông báo", KetQua, undefined, 'success', function () {
                                location.reload();
                            });
                        }
                        else {
                            showMsg('Thông báo lỗi', KetQua);
                        }

                    }
                }.bind(this), 'HS.LamLaiBaiLuyenTap', 'BaiHocGiaoVienID', classhtt.BaiHocGiaoVienID, "BaiHocLopID", classttn.BaiHocLopID, "BaiHocHSID", classhtt.arr_BHHS.BaiHocHSID, "IsLamLai", isLamLai, "Type", "HSLamBaiLai", "Store", classhtt.StoreMode)
            }.bind(this), function () { return; })
        }
        else {
            WSDBGet(function (rs) {
                df_HideLoading();
                if (CheckResult(rs)) {
                    var code = rs.Data.Tables[0].Rows[0].getCell('Code');
                    var KetQua = rs.Data.Tables[0].Rows[0].getCell('KetQua');
                    if (code == true || code == 1) {
                        // showMsg("Thông báo", KetQua, undefined, 'success', function () {
                        //     location.reload();
                        // });
                    }
                    else {
                        showMsg('Thông báo lỗi', KetQua);
                    }
                }
            }.bind(this), 'HS.LamLaiBaiLuyenTap', 'BaiHocGiaoVienID', classhtt.BaiHocGiaoVienID, "BaiHocLopID", classttn.BaiHocLopID, "BaiHocHSID", classhtt.arr_BHHS.BaiHocHSID, "IsLamLai", isLamLai, "Type", "HSLamBaiLai", "Store", classhtt.StoreMode)
            // showConfirm("Làm bài mới - không bảo lưu", "Khi làm bài mới:<br/>- Các câu hỏi,đáp án, vị trí câu hỏi và đáp án sẽ được làm mới.<br/>- Thời gian sẽ được bắt đầu lại.", 'Đồng ý', 'Bỏ qua', function () {
            // }.bind(this), function () { return; })
        }
    }

    this.getTime_End = function() {
        if (this.TimeEnd == null) {
            //if (classhtt.arr_Data_BaiHoc['HCNB'])
            //    this.TimeEnd = new Date(classhtt.arr_Data_BaiHoc['HCNB'].replace(" ", "T"));
            //else
            if (classhtt.arr_Data_BaiHoc['TGKT'])
                this.TimeEnd = new Date(classhtt.arr_Data_BaiHoc['TGKT'].replace(" ", "T"));
        }
    }

    this.tranSTTtoString = function(now_cauhoi, dapan) {
        var arr_HoanViID = convertJson2Array(classttn.arr_HoanVi, 'HoanViID');
        var poshv = arr_HoanViID.indexOf(now_cauhoi.hoanvi);
        var arr_HoanVi_CH = [];
        if (poshv != -1) {
            for (var i = 0; i < 4; i++) {
                arr_HoanVi_CH.push(classttn.arr_HoanVi[poshv + i]);
            }
        }

        var arr_HoanViID_fill = convertJson2Array(arr_HoanVi_CH, 'STTDapAn');
        var pos1 = arr_HoanViID_fill.indexOf(dapan);
        if (pos1 != -1) {
            dapan = arr_HoanVi_CH[pos1]['STT'];
        }

        if (dapan == 0)
            dapan = 'A';
        else if (dapan == 1)
            dapan = 'B';
        else if (dapan == 2)
            dapan = 'C';
        else
            dapan = 'D';
        return dapan;
    }

    this.tranDapAn = function(dapan, arr) {
        var stt = undefined;
        if (dapan == 'A')
            stt = arr[0].stt.toString();
        else if (dapan == 'B')
            stt = arr[1].stt.toString();
        else if (dapan == 'C')
            stt = arr[2].stt.toString();
        else if (dapan == 'D')
            stt = arr[3].stt.toString();
        return stt;
    }
}