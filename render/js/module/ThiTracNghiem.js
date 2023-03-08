
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

        this.updateCauHoi(this.now_slide - 1)

    }

    this.initTimer = function () {

        this.arr_Bailam.forEach(e => {
            var value = this.arr_Data[e.cau - 1];
            var dapan = tranSTTtoString(value, e.dapan);

            e.dapan = dapan;
            e.xemlai = 0
            e.isdaluu = true
        })

        clearInterval(_Ttn_Timer);
        clearInterval(_Web_Check_Timer);
        this.BaiHocHSID = classhtt.arr_BHHS.BaiHocHSID;
        classhtt.BaiHocHSID = classhtt.arr_BHHS.BaiHocHSID;
        this.BaiHocLopID = classhtt.BaiHocLopID
        try {
            var loicau = [];

            for (var i = 0; i < this.arr_Data.length; i++) {
                var chda = this.arr_Data[i];
                if (chda.tracnghiem == true) {
                    if (df_unde(chda.dapan) || chda.dapan.length != chda.SoDapAn) {
                        loicau.push(i + 1);
                    }
                }
                if (!df_unde(chda.doanvan)) {
                    if (df_unde(this.doanvan_cauhoi['dv' + chda.doanvan]))
                        this.doanvan_cauhoi['dv' + chda.doanvan] = [];
                    this.doanvan_cauhoi['dv' + chda.doanvan].push(i + 1);
                }
            }
            if (loicau.length > 0) {
                console.log('Thông báo lỗi' + '<p>Phát hiện đề kiểm tra học sinh có <b>' + loicau.length + '</b> câu bị lỗi không đủ đáp án là các câu: <b style="word-break: break-all;">' + loicau.join(',') + '</b> , hãy thử tải lại trang, nếu thử vài lần không được hãy liên hệ giáo viên xem lại danh sách câu hỏi và phương pháp ra đề.</p>')
                return;
            }
            if (this.second_Bailam < this.limit_minute * 60)
                this.isConThoiGianLamBai = true;

            if (this.arr_Bailam.length > 0 && this.arr_Data.length > 0) {// đã làm/ câu hỏi
                for (var i = 0; i < this.arr_Bailam.length; i++) {
                    this.arr_Bailam[i].isdaluu = true;
                }
                console.log('Đã làm: ' + this.arr_Bailam.length + '/' + this.arr_Data.length);
            }

            if (this.GioBatDauLamBai_Client == undefined) {// lúc chuyển tab qua lại sẽ không reset thời gian
                this.GioBatDauLamBai_Client = new Date();
                this.second_Bailam = 0;
            }

            if (classhtt.arr_BHHS.ThoiGianNopBai && classhtt.arr_BHHS.ThoiGianNopBai != null && classhtt.arr_BHHS.ThoiGianNopBai.trim() != "") {
                this.isNopBai = true;
                this.checkLuuBai()
                console.log("đã nộp bài")
            }

            else {
                console.log("bình thường")
            }

            this.getTime_End();
            var now_fixed = new Date(this.GioHienHanh);
            if (!this.isNopBai && this.TimeEnd > now_fixed) {
                _Ttn_Timer = setInterval(function () {
                    this.second_Bailam++;
                    var ThoiGianLamBai_Client = parseInt((new Date() - this.GioBatDauLamBai_Client) / 1000); // giay
                    this.second_Bailam_TruocDongBo = this.second_Bailam;

                    if (this.second_Bailam >= this.limit_minute * 60) {/*classhtt.isKiemTra && */
                        this.isConThoiGianLamBai = false;
                        clearInterval(_Ttn_Timer);

                        console.log("time end")
                    }

                    this.isConThoiGianLamBai = true;
                    var thoigianconlai = this.limit_minute * 60 - this.second_Bailam;
                    var str = formatTime(Math.floor(thoigianconlai))
                    // console.log(str)
                    document.getElementById('bottom-timer').textContent = str;
                }.bind(this), 1000)
            }
        }
        catch (e) {
            console.log('Thông báo lỗi' + '<p>Phát hiện lỗi trong khi xử lý dữ liệu hãy thử tải lại trang, nếu thử vài lần không được hãy liên hệ giáo viên.</p>' + 'Tải lại trang' + 'error')
        }

    }

    this.backSlide = function () {
        this.now_slide -= 1;
        if (this.now_slide <= 0) {
            this.now_slide = this.arr_Data.length;
        }

        this.updateCauHoi(this.now_slide - 1)
    }

    this.nextSlide = function () {

        var cauChon = Array.from(document.querySelectorAll('div.dapan > div.dp')).map(e => e.querySelector('input').checked).indexOf(true)
        if (cauChon != -1) {
            this.updateBaiLam(this.now_slide , classhtt.MappingID2Char[cauChon])
        }
        console.log(cauChon)

        this.now_slide += 1;
        if (this.now_slide > this.arr_Data.length) {
            this.now_slide = 1;
        }

        this.updateCauHoi(this.now_slide - 1)

    }

    this.updateCauHoi = function (index) {

        document.querySelectorAll('div.dapan > div.dp').forEach(e => {
            e.querySelector('input').checked = false
        })
        const dalam = this.arr_Bailam.filter(e => e.cau == index + 1)[0]
        if (dalam) {
            document.querySelectorAll('div.dapan > div.dp')[classhtt.MappingID2Char.indexOf(dalam.dapan)].querySelector('input').checked = true
        }
        const cau = this.arr_Data[index]
        

        document.querySelector('div.cauhoi > span.stt').innerHTML = `Câu ${index + 1}: `
        document.getElementById('noidungcauhoi').innerHTML = cau.cauhoi;
        document.getElementById('noidung-da-A').innerHTML = cau.dapan[0].noidung
        document.getElementById('noidung-da-B').innerHTML = cau.dapan[1].noidung
        document.getElementById('noidung-da-C').innerHTML = cau.dapan[2].noidung
        document.getElementById('noidung-da-D').innerHTML = cau.dapan[3].noidung
    }

    this.updateBaiLam = function (cau, dapan) {
        if (!this.isConThoiGianLamBai || this.isNopBai) {
            showMsg('Thông báo', (this.isNopBai ? 'Bạn đã nộp bài' : 'Đã qua thời gian cho phép làm bài') + '. Không thể chọn đáp án hoặc lưu bài!', 'OK', 'error', function () { return; });
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

        if (now_cauhoi.tracnghiem)
            this.WriteHist(cau, 'ABCD'.indexOf(dapan));


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

        var cauhoi = this.arr_Data[cau - 1];
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
        this.doSave(true);
    }

    this.WriteHist = function (index, dapan) {
        if (this.LSLamBai == undefined) {// get store
            this.LSLamBai = ''
            if (this.LSLamBai == null) {
                this.LSLamBai = "";
            }
        }
        this.LSLamBai += (classhtt.Log_SoGiayBatDau + this.second_Bailam) + ',' + index + "," + dapan + ";";
    }

    this.getBaiLam_TuLuan = function (showmessage = true) {
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

    this.doSave = function (IsThuCong, SuccessCallback = null) {
        var arr_Cau_dalam = convertJson2Array(this.arr_Bailam, 'cau');
        var pos = arr_Cau_dalam.indexOf(this.now_slide);
        if (this.dtSave.Rows.length >= 8) {// đã không thể lưu được 8 câu
            console.log("Cảnh báo", '<p style="color:red"><b>Không thể lưu bài làm của bạn, vui lòng lưu nháp đáp án và tải lại trang (hoặc nhấn F5)</b></p>' + this.GetCauChuaLuuText(), "Đồng ý", 'error', function () { return; })
        }
        if (this.timeOut || IsThuCong || this.dtSave.Rows.length >= 5 || (pos != -1 && this.arr_Bailam[pos]['dapan'] == 'Tự luận')) {
            this.saveID++;
            var id = this.saveID++;
            this.dtSave.Rows.forEach(function (el) { el.setCell("ID_Save", id); });
            if (this.timeOut || IsThuCong || this.dtSave.Rows.length > 0) {
                // gửi lịch sử chọn đáp án, nếu lưu dc thì xoá lịch sử luôn
                var arr = df_LSToByteArray(this.LSLamBai);
                // convert to string
                var strLS = df_bin2String(arr);
                WSGet(function (result) {
                    if (result.ErrorNumber == 0) {
                        var iID = parseInt(result.Data);
                        if (iID > 0) {
                            var i = 0;
                            while (i < this.dtSave.Rows.length)
                                if (this.dtSave.getCell(i, "ID_Save") == iID)
                                    this.dtSave.Rows.remove(i);
                                else
                                    i++;
                        }
                        if (IsThuCong) {
                            console.log("Thông báo", "Đã lưu bài", "Đồng ý", 'success', function () { return; });
                            if (SuccessCallback != null)
                                SuccessCallback();
                        }
                        // Nếu nộp bài thì phải đợi tại đây
                        if (this.timeOut == true) {
                            this.isNopBai = true;
                            this.checkLuuBai();
                            if ((!this.isBaiGiai && !classhtt.isKiemTra) || classhtt.isKiemTra || classhtt.arr_Data_BaiHoc['ChoXemLaiBaiLam'] == false)
                                clearInterval(_Ttn_Timer);
                            //showMsg("Thông báo nộp bài", 'Bạn đã nộp bài', 'Đồng ý', 'success', function () { return;})
                            console.log("Thông báo nộp bài", '<p><b>Bạn đã nộp bài!</b></br>' + this.LyDoNopBaiHienThi + '</br>- Bấm vào nút tải kết quả để lưu trữ lại kết quả đã nộp. Sử dụng kết quả này để đối chiếu khi cần thiết.</p>', 'Tải kết quả', 'Không tải', function () { classttn.LuuMinhChung(true); }, function () { return; })
                        }
                        this.LSLamBai = "";
                    }
                    else { //đang bị lỗi
                        if (this.timeOut == true)// nộp bài
                        {
                            var errMess = result.ErrorMessage.replace("\\r\\n", "</br>");
                            if (errMess == 'Timeout') {
                                errMess = '<p>Hệ thống chưa lưu được bài làm, vui lòng thử bấm nút "Nộp bài" lần nữa. Nếu vẫn không được bạn liên hệ giáo viên để nhờ hỗ trợ.</p>';
                            }
                            else {// server gửi về
                                //const indexOfFirst = errMess.indexOf(':');
                                //errMess = errMess.substring(indexOfFirst + 1);
                            }
                            // xử lý câu lỗi
                            console.log('Thông báo lỗi nộp bài', errMess, 'Chấp nhận', 'error', function () { return; });
                        }
                        else {
                            var errMess = result.ErrorMessage.replace("\\r\\n", "</br>");
                            if (errMess == 'Timeout') {
                                errMess = '<p>Không thể lưu bài làm của bạn, vui lòng lưu nháp đáp án và tải lại trang (hoặc nhấn F5).</p>' + this.GetCauChuaLuuText();
                            }
                            else {
                                //const indexOfFirst = errMess.indexOf(':');
                                //errMess = errMess.substring(indexOfFirst + 1);
                            }
                            console.log('Thông báo lỗi lưu bài', errMess, 'Chấp nhận', 'error', function () { return; });
                        }
                    }
                }.bind(this), this.DLL, 'ElearningSaveBaiLam_NhieuCau', classhtt.BaiHocGiaoVienID.toString(), this.dtSave, this.timeOut.toString(), this.BaiHocLopID.toString(), strLS);
            }
        }
    }

    this.checkLuuBai = function() {
        document.getElementById('bottom-timer').textContent = "0000"
    }

    this.WriteLog = function (ThoiGianLamBai_Client, LyDoNopBai) {
        WSDBGet(function (rs) {
                //df_HideLoading();
                //if (CheckResult(rs)) {
                //
                console.log("Ghi log " + rs.ErrorNumber)
                //}
            }.bind(this), "HS.TTN.WriteLog", "BaiHocHSID", this.BaiHocHSID.toString(), "ThoiGianLamBai_Client", ThoiGianLamBai_Client.toString(), "second_Bailam", this.second_Bailam_TruocDongBo.toString(), "GioHienHanh_Server", df_DateTime_SQL(new Date(this.GioHienHanh)), "GioHienHanh_Client", df_DateTime_SQL(classttn.GioBatDauLamBai_Client), "limit_minute", this.limit_minute.toFixed(2), "SoGiayLamBai", (df_unnu(classhtt.arr_BHHS.SoGiayLamBai) ? "0" : classhtt.arr_BHHS.SoGiayLamBai.toString()), "GioClient_LucLayCauHoi", df_DateTime_SQL(classhtt.GioClient_LucLayCauHoi), "GioClient_LucGoiHamLuu", df_DateTime_SQL(new Date()), "IsKiemTra", classhtt.isKiemTra, "LyDoNopBai", LyDoNopBai
        );

    }

    this.getTime_End = function () {
        if (this.TimeEnd == null) {
            //if (classhtt.arr_Data_BaiHoc['HCNB'])
            //    this.TimeEnd = new Date(classhtt.arr_Data_BaiHoc['HCNB'].replace(" ", "T"));
            //else
            if (classhtt.arr_Data_BaiHoc['TGKT'])
                this.TimeEnd = new Date(classhtt.arr_Data_BaiHoc['TGKT'].replace(" ", "T"));
        }
    }

    this.resetFieldTracNghiem = function () {
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

    this.lamBaiLai = function (isLamLai) {
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
                                // location.reload();
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
                        showMsg("Thông báo", KetQua, undefined, 'success', function () {
                        });
                        //     location.reload();
                    }
                    else {
                        showMsg('Thông báo lỗi', KetQua);
                    }
                }
            }.bind(this), 'HS.LamLaiBaiLuyenTap', 'BaiHocGiaoVienID', classhtt.BaiHocGiaoVienID, "BaiHocLopID", classttn.BaiHocLopID, "BaiHocHSID", classhtt.arr_BHHS.BaiHocHSID, "IsLamLai", isLamLai, "Type", "HSLamBaiLai", "Store", classhtt.StoreMode)
            showConfirm("Làm bài mới - không bảo lưu", "Khi làm bài mới:<br/>- Các câu hỏi,đáp án, vị trí câu hỏi và đáp án sẽ được làm mới.<br/>- Thời gian sẽ được bắt đầu lại.", 'Đồng ý', 'Bỏ qua', function () {
            }.bind(this), function () { return; })
        }
    }

    this.getTime_End = function () {
        if (this.TimeEnd == null) {
            //if (classhtt.arr_Data_BaiHoc['HCNB'])
            //    this.TimeEnd = new Date(classhtt.arr_Data_BaiHoc['HCNB'].replace(" ", "T"));
            //else
            if (classhtt.arr_Data_BaiHoc['TGKT'])
                this.TimeEnd = new Date(classhtt.arr_Data_BaiHoc['TGKT'].replace(" ", "T"));
        }
    }

    this.tranSTTtoString = function (now_cauhoi, dapan) {
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

    this.tranDapAn = function (dapan, arr) {
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

    this.saveBailamAll = function() {
        this.timeOut = true;
        this.doSave(false)
    }

    this.handlNopBai = function() {
        var ThoiGianLamBai_Client = parseInt((new Date() - this.GioBatDauLamBai_Client) / 1000); // giay
        this.saveBailamAll();
        this.WriteLog(ThoiGianLamBai_Client, 'Web: Học sinh nhấn nút lưu bài.');
    }
}