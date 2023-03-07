var _Home_BaiHocGiaoVienID = null;
var _Home_BaiHocID = null;
var _Home_LopID = null;
var _Ttn_Timer;
var _Htt_Timer;
var _Web_Check_Timer;
var User;
let classhscp, classQLBaiHoc, classhtt, classttn, classChamBaiKTTT;
var Cookie = {}

this.DLL_Login = "Elearning.Core.Login"
const Root = ReactDOM.createRoot(document.getElementById("root"))
function handleLogin(user , pass , remender) {
    if (!(user && pass)) {
        return
    }

    Cookie['Remenber'] = remender

    Service.call((result) => {
        if (!(result.Error == '' || result.Error)) {
            console.log(result.Error)

        }
        else 
        {
            let data = result.Data;
            console.log(result); 
            if (data instanceof DataTable){
                if (data.Columns.exist('ID_Parent')){
                    alert("cảm ơn đã thử dùng ứng dụng, do sự hạn chế bở quền hạn nê tôi(con) chỉ tối ưu hóa cho học sinh mà thôi")
                }

            }
            else {
                if (data.Error != undefined){
                    console.log(data.Error)
                    return ;
                }
                else if (data.get('location') != undefined)
                {

                    getTNTokenID(data.get('location') , (e) => {

                        if (remender) {
                            Cookie_ipc.setAll(Cookie)
                        }

                        WSGet(function (result) {
                            
                            var jsonResult = JSON.parse(result.Data);

                            if (jsonResult) {
                                User = jsonResult
                                classhscp = new HocSinhChonPhong();
                                classhscp.init();

                                classhtt = new HocTrucTuyen();
                                classttn = new ThiTracNghiem();
                            }
                        
                            
                        }, "Elearning.Core.Login", "CheckLogged");
                        
                    })
                }
                else if (data.get('Error') != undefined)
                {
                    console.log(data.get('Error'))
                }
                else {
                    console.log('err')
                }
            }
            


        }
    } , 'Elearning.Core.Login' , 'VietSchoolCheckLogin' , user , pass , '', '', '2');
}

function checkloggin(callback)  {
    WSGet(function (result) {
        var jsonResult = JSON.parse(result.Data);
        if (jsonResult) {
        }

        else {
            Root.render(React.createElement(LoginPage , {onClick: handleLogin}))
        }

        if (callback) callback()

    }, "Elearning.Core.Login", "CheckLogged");
}

function getTNTokenID(url , callback)
{
    console.log(url)
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'text',
        success: function(result){
            // console.log(result);
            Cookie['LoginOTP'] = 1
            let line = result.split('\n');
            line.forEach(element => {
                if (element.includes("var sessionid")){
                    var sessionid = element.split('=')[1].replaceAll("'" , "");
                    sessionid = sessionid.trim()
                    sessionid = sessionid.replace(";" , "");
                    Cookie['Net_SessionId'] = sessionid
                }
                else if (element.includes("var token"))
                {
                    var token = element.split('=')[1].replaceAll("'" , "");
                    token = token.trim()
                    token = token.replace(";" , "");
                    console.log(token);
                    Cookie['TNTokenID'] = token
                }
                else if (element.includes("var error")){
                    var error = element.split('=')[1].replaceAll("'" , "");
                    error = error.substr(1 , error.length - 2);
                    return;
                }
            });

            // connect();
            // document.location.href
            if (callback) callback()
        },

        error: function(error) {
            loaderOff();
            setErr("lỗi lấy Token");
        }
    })

    // WSGet(function (result) {
    //     console.log(result) 
    // }, "Elearning.Core.Login", "CheckLogged");
    
}   
$(document).ready(() => {
        document.getElementById('close').addEventListener("click" , () => {
            App.close()
        })
        document.getElementById('minimize').addEventListener("click" , () => {
            App.minimize()
        })
        console.log("ok")
        connect(() => {})
        Cookie_ipc.all().then(e => {
            Cookie = e;
            console.log(e)
            if (!Cookie.LoginOTP) {
                Root.render(React.createElement(LoginPage , {onClick: handleLogin}))
            }
            else {
                WSGet(function (result) {
                    var jsonResult = JSON.parse(result.Data);
                    if (jsonResult) {
                        User = jsonResult
                        classhscp = new HocSinhChonPhong();
                        classhscp.init();

                        classhtt = new HocTrucTuyen();
                        classttn = new ThiTracNghiem();
                    }

                    else {
                        Root.render(React.createElement(LoginPage , {onClick: handleLogin}))
                    }
                
                    
                }, "Elearning.Core.Login", "CheckLogged");
            }
        })
        
    }

)
