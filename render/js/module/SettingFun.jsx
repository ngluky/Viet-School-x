
const temlaySeting = [
    {
        name: "theme",
        icon: "brush-outline",
        src: null,
        render: function(props) {
            
        }
    }
]

function SettingClose() {
    classhscp.renderInit()
}


function SettingInitRender() {
    Root.render(React.createElement(MainSetting , {data: temlaySeting}))
}