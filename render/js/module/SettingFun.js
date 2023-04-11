
var temlaySeting = [

    {
        name: "Application",
        iconName: 'laptop',
        render: (data) => {
            return React.createElement(AppSetting, { ...data })
        },
        data: {
            eleTemplay: [
                {
                    title: "Application setting",
                    children: [
                        {
                            title: "Automatic update",
                            description: "Enable automatic installation when they become available",
                            button: {
                                type: 'switch',
                                label: null,
                                isCheck: true,
                                active: (event) => {
                                    console.log(event)
                                }
                            },
                        },
                        {
                            title: "Startup",
                            description: "Programs to load each time a computer starts",
                            button: {
                                type: 'switch',
                                label: null,
                                isCheck: false,
                                active: (event) => {
                                    console.log(event)
                                }
                            },
                        },
                        {
                            title: "Notification",
                            description: "Notifications when new rooms are available",
                            button: {
                                type: 'switch',
                                label: null,
                                isCheck: false,
                                active: (event) => {
                                    console.log(event)
                                }
                            }
                        },
                        {
                            title: "Enable animations",
                            description: null,
                            button: {
                                type: 'switch',
                                label: null,
                                isCheck: false,
                                active: (event) => {
                                    console.log(event)
                                }
                            }
                        },
                        {
                            title: "Debugging",
                            description: null,
                            button: {
                                type: 'button',
                                label: 'open DevTools',
                                iconName: 'bug',
                                active: (event) => {
                                    console.log(event)
                                }
                            },
                        },
                    ]
                }
            ]
        }
    },

    {
        name: "Addon",
        iconName: 'extension-puzzle',
        render: () => { },
        data: []
    },
    {
        name: "Keybind",
        iconName: "game-controller",
        render: () => { },
        data: []
    },
    {
        name: "Theme color",
        iconName: "color-palette",
        render: () => { },
        data: []
    }
]

function SettingClose() {
    classhscp.renderInit()
}


function SettingInitRender() {
    Root.render(React.createElement(MainSetting, { data: temlaySeting }))
}