var horizontalDropdownMenu = {
	"items": {
		"content": {
			"hover_in": {
				"animate": true,
				"duration": 200,
				"child:0": {
					"properties" : {
						"background-color": "rgba(205,222,232,0.990)"
					}
				},
				"child:1": {
					"tag": "span",
					"properties" : {
						"color": "rgb(0,0,0)"
					}
				}
			},
			"hover_out": {
				"animate": true,
				"duration": 200,
				"child:0": {
					"properties" : {
						"background-color": "rgba(181,137,0,0.318)"
					}
				},
				"child:1": {
					"tag": "span",
					"properties" : {
						"color": "rgb(0,0,0)"
					}
				}
			}
		},
		"hover_in": {
			"content": {
				"event": "hover_in"
			},
			"submenu": {
				"event": "show",
				"delay": 0
			}
		},
		"hover_out": {
			"content": {
				"event": "hover_out",
				"delay": 0
			},
			"submenu": {
				"event": "hide"
			}
		}
	}
}

registerMenuClass('menu-horizontal-dropdown-1', horizontalDropdownMenu);