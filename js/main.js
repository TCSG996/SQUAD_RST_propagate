class SquadPanel {
    constructor() {
        this.currentPage = 'console';
        this.sidebarExpanded = true;
        this.initializeNavigation();
        this.initializeHamburgerMenu();
        this.initializeEventListeners();
        this.loadPage('console'); // 默认加载控制台页面
    }

    initializeNavigation() {
        // 初始化导航组展开/折叠
        document.querySelectorAll('.nav-group-title').forEach(title => {
            title.addEventListener('click', (e) => {
                const group = e.currentTarget.parentElement;
                group.classList.toggle('active');
            });
        });

        // 初始化页面切换
        document.querySelectorAll('[data-page]').forEach(item => {
            item.addEventListener('click', (e) => {
                const pageId = e.currentTarget.dataset.page;
                this.switchPage(pageId);
            });
        });
    }

    initializeEventListeners() {
        // 服务器选择器事件
        document.addEventListener('change', (e) => {
            if (e.target.id === 'serverSelect') {
                this.loadSquadData(e.target.value);
            }
        });

        // 刷新按钮事件
        document.addEventListener('click', (e) => {
            if (e.target.closest('.refresh-btn')) {
                this.loadSquadData();
            }
        });
    }

    async loadPage(pageId) {
        try {
            console.log(`Loading page: ${pageId}`);
            const response = await fetch(`pages/${pageId}.html`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const content = await response.text();
            document.querySelector('.main-content').innerHTML = content;
            
            // 根据页面ID初始化特定功能
            switch(pageId) {
                case 'console':
                    requestAnimationFrame(() => {
                        this.loadSquadData();
                        console.log('Loading squad data...');
                    });
                    break;
                case 'game-history':
                    this.loadHistoryData();
                    break;
                case 'kills':
                    this.loadKillsData();
                    break;
                case 'downs':
                    this.loadDownsData();
                    break;
                case 'squads':
                    this.loadSquadsData();
                    break;
                case 'chat':
                    this.loadChatData();
                    break;
                case 'players':
                    this.loadPlayersData();
                    break;
                case 'vips':
                    this.loadVipsData();
                    break;
                case 'stats':
                    this.loadStatsData();
                    break;
                // ... 其他页面初始化
            }
        } catch (error) {
            console.error('Error loading page:', error);
            console.error(`Failed to load: pages/${pageId}.html`);
            document.querySelector('.main-content').innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <h2>页面加载失败</h2>
                    <p>请稍后重试或联系管理员</p>
                    <p class="error-details">${error.message}</p>
                    <p class="error-path">路径: pages/${pageId}.html</p>
                </div>
            `;
        }
    }

    // 各页面数据加载方法
    loadHistoryData() {
        const mockHistoryData = {
            matches: [
                {
                    id: 1,
                    map: "Al Basrah",
                    mode: "RAAS v1",
                    time: "2024-03-20 15:30",
                    duration: "45分钟",
                    teams: {
                        team1: {
                            name: "美军",
                            score: 450,
                            isWinner: true
                        },
                        team2: {
                            name: "俄军",
                            score: 0,
                            isWinner: false
                        }
                    }
                },
                {
                    id: 2,
                    map: "Narva",
                    mode: "Invasion v1",
                    time: "2024-03-20 14:30",
                    duration: "35分钟",
                    teams: {
                        team1: {
                            name: "英军",
                            score: 200,
                            isWinner: false
                        },
                        team2: {
                            name: "俄军",
                            score: 600,
                            isWinner: true
                        }
                    }
                },
                {
                    id: 3,
                    map: "Fallujah",
                    mode: "RAAS v2",
                    time: "2024-03-20 13:15",
                    duration: "50分钟",
                    teams: {
                        team1: {
                            name: "加军",
                            score: 350,
                            isWinner: true
                        },
                        team2: {
                            name: "叛军",
                            score: 150,
                            isWinner: false
                        }
                    }
                }
            ]
        };

        const historyList = document.querySelector('.history-list');
        if (!historyList) {
            console.error('History list container not found');
            return;
        }

        historyList.innerHTML = mockHistoryData.matches.map(match => `
            <div class="history-item">
                <div class="match-info">
                    <h3>${match.map} - ${match.mode}</h3>
                    <div class="match-meta">
                        <span class="time"><i class="fas fa-clock"></i> ${match.time}</span>
                        <span class="duration"><i class="fas fa-hourglass-half"></i> ${match.duration}</span>
                    </div>
                </div>
                <div class="teams-result">
                    <div class="team-result ${match.teams.team1.isWinner ? 'winner' : ''}">
                        <span class="team-name">${match.teams.team1.name}</span>
                        <span class="score">${match.teams.team1.score}</span>
                    </div>
                    <div class="vs">VS</div>
                    <div class="team-result ${match.teams.team2.isWinner ? 'winner' : ''}">
                        <span class="team-name">${match.teams.team2.name}</span>
                        <span class="score">${match.teams.team2.score}</span>
                    </div>
                </div>
                <div class="match-actions">
                    <button class="btn" title="查看详情">
                        <i class="fas fa-info-circle"></i> 详情
                    </button>
                    <button class="btn" title="下载回放">
                        <i class="fas fa-download"></i> 回放
                    </button>
                </div>
            </div>
        `).join('');
    }

    loadBansData() {
        // 实现封禁列表数据加载
    }

    loadStatsData() {
        const mockStatsData = {
            overview: {
                totalPlayers: 15863,
                activePlayers: 3254,
                totalPlayTime: "286,432小时",
                avgDailyPlayers: 526,
                peakPlayers: 1024,
                serverUptime: "99.8%"
            },
            playerStats: {
                kills: 286432,
                deaths: 265890,
                kd: "1.08",
                revives: 98654,
                teamkills: 12543,
                vehicleKills: 15632,
                headshots: 45632,
                accuracy: "28.6%"
            },
            mapStats: [
                { name: "Al Basrah", playCount: 286, avgDuration: "45分钟", winRate: { us: "55%", ru: "45%" } },
                { name: "Narva", playCount: 245, avgDuration: "42分钟", winRate: { us: "48%", ru: "52%" } },
                { name: "Fallujah", playCount: 198, avgDuration: "38分钟", winRate: { us: "51%", ru: "49%" } },
                { name: "Goose Bay", playCount: 167, avgDuration: "40分钟", winRate: { us: "53%", ru: "47%" } },
                { name: "Yehorivka", playCount: 156, avgDuration: "44分钟", winRate: { us: "49%", ru: "51%" } }
            ],
            weaponStats: [
                { name: "M4A1", kills: 45632, headshots: 12543, accuracy: "32%" },
                { name: "AK-74M", kills: 42123, headshots: 11234, accuracy: "29%" },
                { name: "M110 SASS", kills: 15632, headshots: 8965, accuracy: "45%" },
                { name: "RPG-7", kills: 8965, headshots: 0, accuracy: "15%" },
                { name: "M240B", kills: 25632, headshots: 5632, accuracy: "24%" }
            ],
            vehicleStats: [
                { name: "M1A2", kills: 5632, losses: 234, kd: "24.1" },
                { name: "T-72B3", kills: 5234, losses: 256, kd: "20.4" },
                { name: "Bradley", kills: 4523, losses: 189, kd: "23.9" },
                { name: "BMP-2", kills: 4123, losses: 198, kd: "20.8" },
                { name: "UH-60M", kills: 2345, losses: 432, kd: "5.4" }
            ],
            timeStats: {
                hourly: [
                    { hour: "00:00", players: 256 },
                    { hour: "01:00", players: 198 },
                    { hour: "02:00", players: 156 },
                    { hour: "03:00", players: 123 },
                    { hour: "04:00", players: 98 },
                    { hour: "05:00", players: 86 },
                    { hour: "06:00", players: 112 },
                    { hour: "07:00", players: 189 },
                    { hour: "08:00", players: 286 },
                    { hour: "09:00", players: 386 },
                    { hour: "10:00", players: 456 },
                    { hour: "11:00", players: 523 },
                    { hour: "12:00", players: 586 },
                    { hour: "13:00", players: 623 },
                    { hour: "14:00", players: 678 },
                    { hour: "15:00", players: 723 },
                    { hour: "16:00", players: 786 },
                    { hour: "17:00", players: 856 },
                    { hour: "18:00", players: 923 },
                    { hour: "19:00", players: 986 },
                    { hour: "20:00", players: 1024 },
                    { hour: "21:00", players: 986 },
                    { hour: "22:00", players: 856 },
                    { hour: "23:00", players: 586 }
                ],
                weekly: [
                    { day: "周一", players: 756 },
                    { day: "周二", players: 698 },
                    { day: "周三", players: 723 },
                    { day: "周四", players: 786 },
                    { day: "周五", players: 923 },
                    { day: "周六", players: 1024 },
                    { day: "周日", players: 986 }
                ]
            }
        };

        // 更新概览数据
        const overviewStats = document.querySelector('.overview-stats');
        if (overviewStats) {
            overviewStats.innerHTML = `
                <div class="stat-card">
                    <i class="fas fa-users"></i>
                    <div class="stat-info">
                        <span class="value">${mockStatsData.overview.totalPlayers}</span>
                        <span class="label">总玩家数</span>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-user-check"></i>
                    <div class="stat-info">
                        <span class="value">${mockStatsData.overview.activePlayers}</span>
                        <span class="label">活跃玩家</span>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-clock"></i>
                    <div class="stat-info">
                        <span class="value">${mockStatsData.overview.totalPlayTime}</span>
                        <span class="label">总游戏时长</span>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-chart-line"></i>
                    <div class="stat-info">
                        <span class="value">${mockStatsData.overview.avgDailyPlayers}</span>
                        <span class="label">平均玩家</span>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-trophy"></i>
                    <div class="stat-info">
                        <span class="value">${mockStatsData.overview.peakPlayers}</span>
                        <span class="label">最高在线</span>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-server"></i>
                    <div class="stat-info">
                        <span class="value">${mockStatsData.overview.serverUptime}</span>
                        <span class="label">服务器运行时间</span>
                    </div>
                </div>
            `;
        }

        // 更新玩家统计数据
        const playerStats = document.querySelector('.player-stats');
        if (playerStats) {
            playerStats.innerHTML = `
                <div class="stat-row">
                    <div class="stat-item">
                        <span class="label">总击杀</span>
                        <span class="value">${mockStatsData.playerStats.kills}</span>
                    </div>
                    <div class="stat-item">
                        <span class="label">总死亡</span>
                        <span class="value">${mockStatsData.playerStats.deaths}</span>
                    </div>
                    <div class="stat-item">
                        <span class="label">K/D比</span>
                        <span class="value">${mockStatsData.playerStats.kd}</span>
                    </div>
                    <div class="stat-item">
                        <span class="label">救起数</span>
                        <span class="value">${mockStatsData.playerStats.revives}</span>
                    </div>
                </div>
                <div class="stat-row">
                    <div class="stat-item">
                        <span class="label">误杀数</span>
                        <span class="value">${mockStatsData.playerStats.teamkills}</span>
                    </div>
                    <div class="stat-item">
                        <span class="label">载具击杀</span>
                        <span class="value">${mockStatsData.playerStats.vehicleKills}</span>
                    </div>
                    <div class="stat-item">
                        <span class="label">爆头数</span>
                        <span class="value">${mockStatsData.playerStats.headshots}</span>
                    </div>
                    <div class="stat-item">
                        <span class="label">平均命中率</span>
                        <span class="value">${mockStatsData.playerStats.accuracy}</span>
                    </div>
                </div>
            `;
        }

        // 更新地图统计数据
        const mapStats = document.querySelector('.map-stats table tbody');
        if (mapStats) {
            mapStats.innerHTML = mockStatsData.mapStats.map(map => `
                <tr>
                    <td>${map.name}</td>
                    <td>${map.playCount}</td>
                    <td>${map.avgDuration}</td>
                    <td>
                        <div class="win-rate">
                            <div class="us" style="width: ${map.winRate.us}"></div>
                            <div class="ru" style="width: ${map.winRate.ru}"></div>
                        </div>
                        <div class="win-rate-text">
                            <span class="us">${map.winRate.us}</span>
                            <span class="ru">${map.winRate.ru}</span>
                        </div>
                    </td>
                </tr>
            `).join('');
        }

        // 更新武器统计数据
        const weaponStats = document.querySelector('.weapon-stats table tbody');
        if (weaponStats) {
            weaponStats.innerHTML = mockStatsData.weaponStats.map(weapon => `
                <tr>
                    <td>${weapon.name}</td>
                    <td>${weapon.kills}</td>
                    <td>${weapon.headshots}</td>
                    <td>${weapon.accuracy}</td>
                </tr>
            `).join('');
        }

        // 更新载具统计数据
        const vehicleStats = document.querySelector('.vehicle-stats table tbody');
        if (vehicleStats) {
            vehicleStats.innerHTML = mockStatsData.vehicleStats.map(vehicle => `
                <tr>
                    <td>${vehicle.name}</td>
                    <td>${vehicle.kills}</td>
                    <td>${vehicle.losses}</td>
                    <td>${vehicle.kd}</td>
                </tr>
            `).join('');
        }

        // 初始化每日在线趋势图表
        const hourlyChartCanvas = document.getElementById('hourlyChart');
        if (hourlyChartCanvas && typeof Chart !== 'undefined') {
            try {
                new Chart(hourlyChartCanvas, {
                    type: 'line',
                    data: {
                        labels: mockStatsData.timeStats.hourly.map(item => item.hour),
                        datasets: [{
                            label: '在线人数',
                            data: mockStatsData.timeStats.hourly.map(item => item.players),
                            fill: true,
                            borderColor: '#1976D2',
                            backgroundColor: 'rgba(25, 118, 210, 0.1)',
                            tension: 0.4,
                            pointRadius: 3,
                            pointBackgroundColor: '#1976D2',
                            pointBorderColor: '#fff',
                            pointBorderWidth: 2,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: '#1976D2',
                            pointHoverBorderColor: '#fff',
                            pointHoverBorderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                mode: 'index',
                                intersect: false,
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                titleColor: '#2c3e50',
                                bodyColor: '#2c3e50',
                                borderColor: '#e0e0e0',
                                borderWidth: 1,
                                padding: 12,
                                displayColors: false,
                                callbacks: {
                                    label: function(context) {
                                        return `在线人数: ${context.parsed.y}`;
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false
                                },
                                ticks: {
                                    color: '#666',
                                    font: {
                                        size: 11
                                    },
                                    maxRotation: 0
                                }
                            },
                            y: {
                                beginAtZero: true,
                                grid: {
                                    color: 'rgba(0, 0, 0, 0.05)'
                                },
                                ticks: {
                                    color: '#666',
                                    font: {
                                        size: 11
                                    }
                                }
                            }
                        },
                        interaction: {
                            intersect: false,
                            mode: 'index'
                        }
                    }
                });
            } catch (error) {
                console.error('Error initializing chart:', error);
            }
        }

        // 监听图表范围选择
        const chartRange = document.querySelector('.chart-range');
        if (chartRange) {
            chartRange.addEventListener('change', (e) => {
                // 这里可以根据选择的范围重新加载数据
                console.log('Selected range:', e.target.value);
            });
        }
    }

    loadSettings() {
        // 实现设置加载
    }

    loadSquadData(serverId = 'server1') {
        console.log('Squad data loading started...');
        // 模拟从后端API获取数据
        const mockData = {
            teams: [
                {
                    name: "美军",
                    squads: [
                        {
                            id: 1,
                            name: "突击小队",
                            leader: "Squad_Leader_1",
                            members: {
                                leader: "Squad_Leader_1",
                                soldiers: [
                                    "Rifleman_1", "Medic_1", "AT_1", "Grenadier_1",
                                    "MG_1", "Engineer_1", "LAT_1", "Marksman_1"
                                ]
                            },
                            type: "步兵",
                            locked: false
                        },
                        {
                            id: 2,
                            name: "装甲小队",
                            leader: "Tank_Commander",
                            members: {
                                leader: "Tank_Commander",
                                soldiers: [
                                    "Gunner_1", "Driver_1", "Loader_1", "Support_1",
                                    "AT_2", "Engineer_2", "Medic_2", "Rifleman_2"
                                ]
                            },
                            type: "装甲",
                            locked: true
                        },
                        {
                            id: 3,
                            name: "直升机小队",
                            leader: "Pilot_Ace",
                            members: {
                                leader: "Pilot_Ace",
                                soldiers: [
                                    "CoPilot_1", "Gunner_2", "Engineer_3", "Medic_3",
                                    "Support_2", "AT_3", "Rifleman_3", "Scout_1"
                                ]
                            },
                            type: "空中",
                            locked: true
                        },
                        {
                            id: 4,
                            name: "狙击小队",
                            leader: "Sniper_Elite",
                            members: {
                                leader: "Sniper_Elite",
                                soldiers: [
                                    "Spotter_1", "Marksman_2", "Scout_2", "LAT_2",
                                    "Medic_4", "Support_3", "Engineer_4", "Rifleman_4"
                                ]
                            },
                            type: "步兵",
                            locked: false
                        },
                        {
                            id: 5,
                            name: "火力支援",
                            leader: "Support_Leader_1",
                            members: {
                                leader: "Support_Leader_1",
                                soldiers: [
                                    "MG_2", "AT_4", "Medic_5", "Engineer_5",
                                    "Grenadier_2", "LAT_3", "Rifleman_5", "Support_4"
                                ]
                            },
                            type: "步兵",
                            locked: false
                        }
                    ]
                },
                {
                    name: "俄军",
                    squads: [
                        {
                            id: 1,
                            name: "机械化小队",
                            leader: "Russian_Leader",
                            members: {
                                leader: "Russian_Leader",
                                soldiers: [
                                    "Gunner_3", "Driver_2", "AT_5", "Engineer_6",
                                    "Medic_6", "Support_5", "Rifleman_6", "Scout_3"
                                ]
                            },
                            type: "装甲",
                            locked: false
                        },
                        {
                            id: 2,
                            name: "火力支援",
                            leader: "Support_Leader_2",
                            members: {
                                leader: "Support_Leader_2",
                                soldiers: [
                                    "MG_3", "AT_6", "Medic_7", "Engineer_7",
                                    "Grenadier_3", "LAT_4", "Rifleman_7", "Support_6"
                                ]
                            },
                            type: "步兵",
                            locked: false
                        },
                        {
                            id: 3,
                            name: "侦察小队",
                            leader: "Scout_Master",
                            members: {
                                leader: "Scout_Master",
                                soldiers: [
                                    "Spotter_2", "Marksman_3", "Scout_4", "LAT_5",
                                    "Medic_8", "Support_7", "Engineer_8", "Rifleman_8"
                                ]
                            },
                            type: "步兵",
                            locked: true
                        },
                        {
                            id: 4,
                            name: "突击小队",
                            leader: "Assault_Leader",
                            members: {
                                leader: "Assault_Leader",
                                soldiers: [
                                    "AT_7", "Medic_9", "MG_4", "Engineer_9",
                                    "Grenadier_4", "LAT_6", "Rifleman_9", "Support_8"
                                ]
                            },
                            type: "步兵",
                            locked: false
                        },
                        {
                            id: 5,
                            name: "装甲支援",
                            leader: "Armor_Leader",
                            members: {
                                leader: "Armor_Leader",
                                soldiers: [
                                    "Gunner_4", "Driver_3", "AT_8", "Engineer_10",
                                    "Medic_10", "Support_9", "Rifleman_10", "Scout_5"
                                ]
                            },
                            type: "装甲",
                            locked: true
                        }
                    ]
                }
            ],
            serverInfo: {
                map: "Al Basrah",
                mode: "RAAS v1",
                players: "78/100",
                ping: "25ms",
                gameTime: "15:30",
                nextMap: "Fallujah",
                tickets: {
                    team1: 450,
                    team2: 387
                }
            }
        };

        console.log('Updating server info...');
        this.updateServerInfo(mockData.serverInfo);
        console.log('Updating teams display...');
        this.updateTeamsDisplay(mockData);
    }

    updateServerInfo(info) {
        const serverInfo = document.querySelector('.server-info');
        if (!serverInfo) {
            console.error('Server info container not found');
            return;
        }

        console.log('Server info container found, updating...'); // 添加调试日志
        const infoTags = {
            map: { icon: 'fa-map', text: `地图: ${info.map}` },
            mode: { icon: 'fa-gamepad', text: `模式: ${info.mode}` },
            players: { icon: 'fa-users', text: `人数: ${info.players}` },
            ping: { icon: 'fa-signal', text: `延迟: ${info.ping}` },
            gameTime: { icon: 'fa-clock', text: `开局: ${info.gameTime}` },
            nextMap: { icon: 'fa-map-marked-alt', text: `下图: ${info.nextMap}` },
            tickets: { icon: 'fa-ticket-alt', text: `票数: ${info.tickets.team1} vs ${info.tickets.team2}` }
        };

        serverInfo.innerHTML = Object.entries(infoTags).map(([key, value]) => `
            <div class="info-tag">
                <i class="fas ${value.icon}"></i>
                ${value.text}
            </div>
        `).join('');
    }

    updateTeamsDisplay(data) {
        const squadLists = document.querySelectorAll('.squad-list');
        
        if (!squadLists.length) {
            console.error('Squad lists containers not found');
            return;
        }

        console.log('Found squad lists:', squadLists.length);
        squadLists.forEach(list => list.innerHTML = '');

        if (!data || !Array.isArray(data.teams)) {
            console.error('Invalid team data');
            return;
        }
        
        data.teams.forEach((team, index) => {
            const squadList = squadLists[index];
            if (squadList && team && team.squads) {
                console.log(`Updating team ${index + 1} with ${team.squads.length} squads`);
                team.squads.forEach(squad => {
                    const squadElement = this.createSquadElement(squad);
                    squadList.appendChild(squadElement);
                });
            }
        });
    }

    createSquadElement(squad) {
        const div = document.createElement('div');
        div.className = `squad ${squad.locked ? 'locked' : ''}`;
        div.innerHTML = `
            <div class="squad-header">
                <span class="squad-name">${squad.name}</span>
                <span class="squad-type ${squad.type.toLowerCase()}">${squad.type}</span>
                ${squad.locked ? '<i class="fas fa-lock"></i>' : ''}
            </div>
            <div class="squad-info">
                <span class="leader"><i class="fas fa-user-shield"></i> ${squad.members.leader}</span>
                <span class="members"><i class="fas fa-users"></i> ${squad.members.soldiers.length + 1}/9</span>
            </div>
            <div class="squad-members">
                <table class="members-table">
                    <tr class="member leader">
                        <td class="member-name">
                            <i class="fas fa-star"></i>
                            ${squad.members.leader}
                        </td>
                        <td class="member-stats">
                            <span class="kills">12</span>-
                            <span class="deaths">3</span>-
                            <span class="revives">5</span>
                        </td>
                    </tr>
                    ${squad.members.soldiers.map(soldier => `
                        <tr class="member">
                            <td class="member-name">
                                <i class="fas fa-user"></i>
                                ${soldier}
                            </td>
                            <td class="member-stats">
                                <span class="kills">8</span>-
                                <span class="deaths">6</span>-
                                <span class="revives">2</span>
                            </td>
                        </tr>
                    `).join('')}
                </table>
            </div>
            <div class="squad-actions">
                <button class="btn small" title="查看详情"><i class="fas fa-info-circle"></i></button>
                <button class="btn small" title="发送消息"><i class="fas fa-comment"></i></button>
                ${squad.locked ? 
                    '<button class="btn small warning" title="解锁"><i class="fas fa-unlock"></i></button>' :
                    '<button class="btn small" title="锁定"><i class="fas fa-lock"></i></button>'
                }
                <button class="btn small danger" title="解散"><i class="fas fa-times"></i></button>
            </div>
        `;
        return div;
    }

    switchPage(pageId) {
        if (!pageId || this.currentPage === pageId) return;

        // 更新导航项的活动状态
        document.querySelectorAll('[data-page]').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-page="${pageId}"]`).classList.add('active');

        // 加载新页面
        this.loadPage(pageId);
        this.currentPage = pageId;

        // 确保包含当前页的导航组保持展开
        const navItem = document.querySelector(`[data-page="${pageId}"]`);
        const navGroup = navItem.closest('.nav-group');
        if (navGroup) {
            navGroup.classList.add('active');
        }
    }

    // 添加新的数据加载方法
    loadKillsData() {
        const mockKillsData = {
            kills: [
                {
                    id: 1,
                    killer: {
                        name: "Sniper_Elite",
                        team: "美军",
                        avatar: "assets/avatar.png"
                    },
                    victim: {
                        name: "Target_001",
                        team: "俄军",
                        avatar: "assets/avatar.png"
                    },
                    weapon: "M110 SASS",
                    distance: "450m",
                    time: "2024-03-20 15:30",
                    map: "Al Basrah",
                    isHeadshot: true
                },
                {
                    id: 2,
                    killer: {
                        name: "Tank_Commander",
                        team: "美军",
                        avatar: "assets/avatar.png"
                    },
                    victim: {
                        name: "Infantry_001",
                        team: "俄军",
                        avatar: "assets/avatar.png"
                    },
                    weapon: "M1A2 主战坦克",
                    distance: "800m",
                    time: "2024-03-20 15:28",
                    map: "Al Basrah",
                    isVehicleKill: true
                },
                {
                    id: 3,
                    killer: {
                        name: "Assault_Leader",
                        team: "俄军",
                        avatar: "assets/avatar.png"
                    },
                    victim: {
                        name: "Medic_001",
                        team: "美军",
                        avatar: "assets/avatar.png"
                    },
                    weapon: "AK-74M",
                    distance: "50m",
                    time: "2024-03-20 15:25",
                    map: "Al Basrah"
                },
                {
                    id: 4,
                    killer: {
                        name: "Pilot_Ace",
                        team: "美军",
                        avatar: "assets/avatar.png"
                    },
                    victim: {
                        name: "AA_Gunner",
                        team: "俄军",
                        avatar: "assets/avatar.png"
                    },
                    weapon: "AH-64 Apache",
                    distance: "1200m",
                    time: "2024-03-20 15:22",
                    map: "Al Basrah",
                    isVehicleKill: true
                },
                {
                    id: 5,
                    killer: {
                        name: "MG_Master",
                        team: "俄军",
                        avatar: "assets/avatar.png"
                    },
                    victim: {
                        name: "Rush_001",
                        team: "美军",
                        avatar: "assets/avatar.png"
                    },
                    weapon: "PKP",
                    distance: "150m",
                    time: "2024-03-20 15:20",
                    map: "Al Basrah"
                },
                {
                    id: 6,
                    killer: {
                        name: "AT_Specialist",
                        team: "美军",
                        avatar: "assets/avatar.png"
                    },
                    victim: {
                        name: "BTR_Driver",
                        team: "俄军",
                        avatar: "assets/avatar.png"
                    },
                    weapon: "Javelin",
                    distance: "350m",
                    time: "2024-03-20 15:18",
                    map: "Al Basrah",
                    isVehicleKill: true
                },
                {
                    id: 7,
                    killer: {
                        name: "Scout_Leader",
                        team: "俄军",
                        avatar: "assets/avatar.png"
                    },
                    victim: {
                        name: "Supply_Runner",
                        team: "美军",
                        avatar: "assets/avatar.png"
                    },
                    weapon: "SVD",
                    distance: "280m",
                    time: "2024-03-20 15:15",
                    map: "Al Basrah",
                    isHeadshot: true
                },
                {
                    id: 8,
                    killer: {
                        name: "CQB_Expert",
                        team: "美军",
                        avatar: "assets/avatar.png"
                    },
                    victim: {
                        name: "Defender_001",
                        team: "俄军",
                        avatar: "assets/avatar.png"
                    },
                    weapon: "M4A1",
                    distance: "10m",
                    time: "2024-03-20 15:12",
                    map: "Al Basrah"
                },
                {
                    id: 9,
                    killer: {
                        name: "IFV_Commander",
                        team: "俄军",
                        avatar: "assets/avatar.png"
                    },
                    victim: {
                        name: "LAT_001",
                        team: "美军",
                        avatar: "assets/avatar.png"
                    },
                    weapon: "BMP-2",
                    distance: "400m",
                    time: "2024-03-20 15:10",
                    map: "Al Basrah",
                    isVehicleKill: true
                },
                {
                    id: 10,
                    killer: {
                        name: "Grenadier_Pro",
                        team: "美军",
                        avatar: "assets/avatar.png"
                    },
                    victim: {
                        name: "MG_Nest",
                        team: "俄军",
                        avatar: "assets/avatar.png"
                    },
                    weapon: "M203 榴弹",
                    distance: "120m",
                    time: "2024-03-20 15:08",
                    map: "Al Basrah"
                }
            ]
        };

        const killsList = document.querySelector('.kills-list');
        if (!killsList) {
            console.error('Kills list container not found');
            return;
        }

        killsList.innerHTML = mockKillsData.kills.map(kill => `
            <div class="kill-item">
                <div class="kill-info">
                    <div class="player killer">
                        <!-- <img src="${kill.killer.avatar}" class="player-avatar"> -->
                        <div class="player-details">
                            <span class="name">${kill.killer.name}</span>
                            <span class="team ${kill.killer.team === '美军' ? 'us' : 'ru'}">${kill.killer.team}</span>
                        </div>
                    </div>
                    <div class="kill-details">
                        <i class="fas ${kill.isHeadshot ? 'fa-bullseye' : kill.isVehicleKill ? 'fa-tank' : 'fa-skull'}"></i>
                        <span class="weapon">${kill.weapon}</span>
                        <span class="distance">${kill.distance}</span>
                        ${kill.isHeadshot ? '<span class="headshot-tag">爆头</span>' : ''}
                        ${kill.isVehicleKill ? '<span class="vehicle-tag">载具击杀</span>' : ''}
                    </div>
                    <div class="player victim">
                        <div class="player-details">
                            <span class="name">${kill.victim.name}</span>
                            <span class="team ${kill.victim.team === '美军' ? 'us' : 'ru'}">${kill.victim.team}</span>
                        </div>
                        <!-- <img src="${kill.victim.avatar}" class="player-avatar"> -->
                    </div>
                </div>
                <div class="kill-meta">
                    <span class="time">${kill.time}</span>
                    <span class="map">${kill.map}</span>
                </div>
            </div>
        `).join('');
    }

    loadDownsData() {
        const mockDownsData = {
            downs: [
                {
                    id: 1,
                    downer: {
                        name: "MG_Master",
                        team: "美军",
                        avatar: "assets/avatar.png"
                    },
                    downed: {
                        name: "Infantry_001",
                        team: "俄军",
                        avatar: "assets/avatar.png"
                    },
                    weapon: "M240B",
                    distance: "120m",
                    time: "2024-03-20 15:30",
                    map: "Al Basrah",
                    revived: {
                        status: true,
                        medic: "Medic_Pro",
                        time: "35秒"
                    }
                },
                {
                    id: 2,
                    downer: {
                        name: "Sniper_Pro",
                        team: "俄军",
                        avatar: "assets/avatar.png"
                    },
                    downed: {
                        name: "Medic_002",
                        team: "美军",
                        avatar: "assets/avatar.png"
                    },
                    weapon: "SVD",
                    distance: "350m",
                    time: "2024-03-20 15:28",
                    map: "Al Basrah",
                    revived: {
                        status: false
                    }
                },
                // ... 添加更多记录 ...
            ]
        };

        const downsList = document.querySelector('.downs-list');
        if (!downsList) {
            console.error('Downs list container not found');
            return;
        }

        downsList.innerHTML = mockDownsData.downs.map(down => `
            <div class="down-item">
                <div class="down-info">
                    <div class="player downer">
                        <!-- <img src="${down.downer.avatar}" class="player-avatar"> -->
                        <div class="player-details">
                            <span class="name">${down.downer.name}</span>
                            <span class="team ${down.downer.team === '美军' ? 'us' : 'ru'}">${down.downer.team}</span>
                        </div>
                    </div>
                    <div class="down-details">
                        <i class="fas fa-heart-broken"></i>
                        <span class="weapon">${down.weapon}</span>
                        <span class="distance">${down.distance}</span>
                    </div>
                    <div class="player downed">
                        <div class="player-details">
                            <span class="name">${down.downed.name}</span>
                            <span class="team ${down.downed.team === '美军' ? 'us' : 'ru'}">${down.downed.team}</span>
                        </div>
                        <!-- <img src="${down.downed.avatar}" class="player-avatar"> -->
                    </div>
                </div>
                <div class="down-status ${down.revived.status ? 'revived' : 'dead'}">
                    <i class="fas ${down.revived.status ? 'fa-heart' : 'fa-skull'}"></i>
                    <span>${down.revived.status ? 
                        `已复活 - 由 ${down.revived.medic} 在 ${down.revived.time}后救起` : 
                        '已阵亡'}</span>
                </div>
                <div class="down-meta">
                    <span class="time">${down.time}</span>
                    <span class="map">${down.map}</span>
                </div>
            </div>
        `).join('');
    }

    loadSquadsData() {
        const mockSquadsData = {
            squads: [
                {
                    id: 1,
                    name: "突击小队",
                    type: "步兵",
                    team: "美军",
                    leader: {
                        name: "Squad_Leader_1",
                        steamId: "STEAM_0:1:123456789",
                        avatar: "assets/avatar.png"
                    },
                    createdAt: "2024-03-20 15:00",
                    disbandedAt: "2024-03-20 16:30",
                    duration: "90分钟",
                    maxMembers: 9,
                    stats: {
                        kills: 25,
                        deaths: 12,
                        revives: 8
                    },
                    timeline: [
                        {
                            time: "15:00",
                            event: "创建小队",
                            icon: "fa-plus-circle"
                        },
                        {
                            time: "15:05",
                            event: "9人满员",
                            icon: "fa-users"
                        },
                        {
                            time: "16:30",
                            event: "解散小队",
                            icon: "fa-minus-circle"
                        }
                    ]
                },
                {
                    id: 2,
                    name: "装甲小队",
                    type: "装甲",
                    team: "俄军",
                    leader: {
                        name: "Tank_Commander",
                        steamId: "STEAM_0:1:987654321",
                        avatar: "assets/avatar.png"
                    },
                    createdAt: "2024-03-20 15:15",
                    disbandedAt: "2024-03-20 16:45",
                    duration: "90分钟",
                    maxMembers: 4,
                    stats: {
                        kills: 15,
                        deaths: 2,
                        revives: 0
                    },
                    timeline: [
                        {
                            time: "15:15",
                            event: "创建小队",
                            icon: "fa-plus-circle"
                        },
                        {
                            time: "15:20",
                            event: "4人满员",
                            icon: "fa-users"
                        },
                        {
                            time: "16:45",
                            event: "解散小队",
                            icon: "fa-minus-circle"
                        }
                    ]
                },
                // ... 添加更多记录 ...
            ]
        };

        const squadsList = document.querySelector('.squads-list');
        if (!squadsList) {
            console.error('Squads list container not found');
            return;
        }

        squadsList.innerHTML = mockSquadsData.squads.map(squad => `
            <div class="squad-record">
                <div class="squad-header">
                    <div class="squad-info">
                        <div class="squad-type ${squad.type.toLowerCase()}">
                            <i class="fas fa-users"></i>
                            ${squad.type}
                        </div>
                        <h3>${squad.name}</h3>
                        <div class="team-tag ${squad.team === '美军' ? 'us' : 'ru'}">${squad.team}</div>
                    </div>
                    <div class="squad-stats">
                        <div class="stat">
                            <span class="label">存活时间</span>
                            <span class="value">${squad.duration}</span>
                        </div>
                        <div class="stat">
                            <span class="label">最高人数</span>
                            <span class="value">${squad.maxMembers}人</span>
                        </div>
                        <div class="stat">
                            <span class="label">击杀/死亡</span>
                            <span class="value">${squad.stats.kills}/${squad.stats.deaths}</span>
                        </div>
                    </div>
                </div>
                <!-- 小队详情 -->
                <div class="squad-details">
                    <div class="leader-info">
                        <!-- <img src="${squad.leader.avatar}" class="leader-avatar">  -->
                        <div class="leader-details">
                            <span class="name">${squad.leader.name}</span>
                            <span class="steam-id">${squad.leader.steamId}</span>
                        </div>
                    </div>
                    <div class="squad-timeline">
                        ${squad.timeline.map(event => `
                            <div class="timeline-event ${event.event.toLowerCase().replace(/\s+/g, '-')}">
                                <i class="fas ${event.icon}"></i>
                                <span>${event.time} - ${event.event}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadPlayersData() {
        const mockPlayersData = {
            players: [
                {
                    id: 1,
                    name: "Elite_Soldier",
                    steamId: "STEAM_0:1:123456789",
                    avatar: "assets/avatar.png",
                    status: "online",
                    stats: {
                        playTime: "523小时",
                        kd: "1.8",
                        winRate: "65%",
                        kills: 2345,
                        deaths: 1298,
                        revives: 456
                    },
                    roles: ["VIP", "老玩家"]
                },
                {
                    id: 2,
                    name: "Tank_Commander",
                    steamId: "STEAM_0:1:987654321",
                    avatar: "assets/avatar.png",
                    status: "offline",
                    stats: {
                        playTime: "345小时",
                        kd: "2.1",
                        winRate: "70%",
                        kills: 1890,
                        deaths: 890,
                        revives: 123
                    },
                    roles: ["装甲专家"]
                },
                {
                    id: 3,
                    name: "Medic_Hero",
                    steamId: "STEAM_0:1:456789123",
                    avatar: "assets/avatar.png",
                    status: "online",
                    stats: {
                        playTime: "678小时",
                        kd: "0.9",
                        winRate: "62%",
                        kills: 890,
                        deaths: 980,
                        revives: 2345
                    },
                    roles: ["医疗专家", "VIP"]
                },
                {
                    id: 4,
                    name: "Sniper_Master",
                    steamId: "STEAM_0:1:789123456",
                    avatar: "assets/avatar.png",
                    status: "offline",
                    stats: {
                        playTime: "432小时",
                        kd: "3.2",
                        winRate: "58%",
                        kills: 2890,
                        deaths: 890,
                        revives: 67
                    },
                    roles: ["狙击手"]
                },
                {
                    id: 5,
                    name: "Squad_Leader",
                    steamId: "STEAM_0:1:321654987",
                    avatar: "assets/avatar.png",
                    status: "online",
                    stats: {
                        playTime: "890小时",
                        kd: "1.5",
                        winRate: "75%",
                        kills: 1567,
                        deaths: 1045,
                        revives: 345
                    },
                    roles: ["指挥官", "VIP"]
                },
                {
                    id: 6,
                    name: "Engineer_Pro",
                    steamId: "STEAM_0:1:147258369",
                    avatar: "assets/avatar.png",
                    status: "online",
                    stats: {
                        playTime: "234小时",
                        kd: "1.1",
                        winRate: "60%",
                        kills: 789,
                        deaths: 712,
                        revives: 89
                    },
                    roles: ["工程兵"]
                },
                {
                    id: 7,
                    name: "Pilot_Ace",
                    steamId: "STEAM_0:1:963852741",
                    avatar: "assets/avatar.png",
                    status: "offline",
                    stats: {
                        playTime: "567小时",
                        kd: "2.8",
                        winRate: "72%",
                        kills: 2123,
                        deaths: 756,
                        revives: 45
                    },
                    roles: ["飞行员", "VIP"]
                },
                {
                    id: 8,
                    name: "Support_King",
                    steamId: "STEAM_0:1:852963741",
                    avatar: "assets/avatar.png",
                    status: "online",
                    stats: {
                        playTime: "345小时",
                        kd: "1.3",
                        winRate: "68%",
                        kills: 1234,
                        deaths: 945,
                        revives: 567
                    },
                    roles: ["后勤兵"]
                },
                {
                    id: 9,
                    name: "AT_Specialist",
                    steamId: "STEAM_0:1:741852963",
                    avatar: "assets/avatar.png",
                    status: "offline",
                    stats: {
                        playTime: "456小时",
                        kd: "1.7",
                        winRate: "64%",
                        kills: 1678,
                        deaths: 989,
                        revives: 234
                    },
                    roles: ["反坦克手"]
                },
                {
                    id: 10,
                    name: "Grenadier_Expert",
                    steamId: "STEAM_0:1:369258147",
                    avatar: "assets/avatar.png",
                    status: "online",
                    stats: {
                        playTime: "321小时",
                        kd: "1.6",
                        winRate: "66%",
                        kills: 1456,
                        deaths: 912,
                        revives: 178
                    },
                    roles: ["掷弹兵"]
                }
            ]
        };

        const playersGrid = document.querySelector('.players-grid');
        if (!playersGrid) {
            console.error('Players grid container not found');
            return;
        }

        playersGrid.innerHTML = mockPlayersData.players.map(player => `
            <div class="player-card">
                <div class="player-header">
                    <img src="${player.avatar}" class="player-avatar">
                    <div class="player-info">
                        <h3>${player.name}</h3>
                        <span class="steam-id">${player.steamId}</span>
                    </div>
                    <div class="player-status ${player.status}">${player.status}</div>
                </div>
                <div class="player-stats">
                    <div class="stats-row">
                        <div class="stat-item">
                            <span class="label">游戏时长</span>
                            <span class="value">${player.stats.playTime}</span>
                        </div>
                        <div class="stat-item">
                            <span class="label">K/D比</span>
                            <span class="value">${player.stats.kd}</span>
                        </div>
                        <div class="stat-item">
                            <span class="label">胜率</span>
                            <span class="value">${player.stats.winRate}</span>
                        </div>
                    </div>
                    <div class="stats-row">
                        <div class="stat-item">
                            <span class="label">击杀</span>
                            <span class="value">${player.stats.kills}</span>
                        </div>
                        <div class="stat-item">
                            <span class="label">死亡</span>
                            <span class="value">${player.stats.deaths}</span>
                        </div>
                        <div class="stat-item">
                            <span class="label">救起</span>
                            <span class="value">${player.stats.revives}</span>
                        </div>
                    </div>
                </div>
                <div class="player-roles">
                    ${player.roles.map(role => `
                        <span class="role-tag">${role}</span>
                    `).join('')}
                </div>
                <div class="player-actions">
                    <button class="btn"><i class="fas fa-user-shield"></i> 详细信息</button>
                    <button class="btn"><i class="fas fa-ban"></i> 封禁</button>
                </div>
            </div>
        `).join('');
    }

    loadChatData() {
        // 实现聊天数据加载
    }

    loadVoteData() {
        // 实现投票管理数据加载
    }

    loadVipsData() {
        const mockVipsData = {
            vips: [
                {
                    id: 1,
                    name: "Elite_VIP",
                    steamId: "STEAM_0:1:123456789",
                    avatar: "assets/avatar.png",
                    status: "active",
                    startDate: "2024-01-01",
                    endDate: "2024-12-31",
                    level: "钻石会员",
                    admin: "Admin_01",
                    note: "年费赞助者",
                    lastOnline: "2024-03-20 15:30"
                },
                {
                    id: 2,
                    name: "Pro_Player",
                    steamId: "STEAM_0:1:987654321",
                    avatar: "assets/avatar.png",
                    status: "active",
                    startDate: "2024-03-01",
                    endDate: "2024-06-01",
                    level: "黄金会员",
                    admin: "Admin_02",
                    note: "度赞助",
                    lastOnline: "2024-03-19 22:15"
                },
                {
                    id: 3,
                    name: "Veteran_User",
                    steamId: "STEAM_0:1:456789123",
                    avatar: "assets/avatar.png",
                    status: "expired",
                    startDate: "2023-12-01",
                    endDate: "2024-03-01",
                    level: "白银会员",
                    admin: "Admin_01",
                    note: "老玩家",
                    lastOnline: "2024-03-18 19:45"
                },
                {
                    id: 4,
                    name: "Squad_Leader",
                    steamId: "STEAM_0:1:789123456",
                    avatar: "assets/avatar.png",
                    status: "active",
                    startDate: "2024-02-15",
                    endDate: "2024-05-15",
                    level: "黄金会员",
                    admin: "Admin_03",
                    note: "优秀指挥官",
                    lastOnline: "2024-03-20 16:00"
                },
                {
                    id: 5,
                    name: "Tank_Master",
                    steamId: "STEAM_0:1:321654987",
                    avatar: "assets/avatar.png",
                    status: "active",
                    startDate: "2024-03-10",
                    endDate: "2024-09-10",
                    level: "铂金会员",
                    admin: "Admin_02",
                    note: "装甲部队指挥",
                    lastOnline: "2024-03-20 14:20"
                },
                {
                    id: 6,
                    name: "Pilot_Expert",
                    steamId: "STEAM_0:1:147258369",
                    avatar: "assets/avatar.png",
                    status: "active",
                    startDate: "2024-01-15",
                    endDate: "2024-07-15",
                    level: "铂金会员",
                    admin: "Admin_01",
                    note: "王牌飞行员",
                    lastOnline: "2024-03-19 23:40"
                },
                {
                    id: 7,
                    name: "Support_King",
                    steamId: "STEAM_0:1:963852741",
                    avatar: "assets/avatar.png",
                    status: "expired",
                    startDate: "2023-11-01",
                    endDate: "2024-02-01",
                    level: "白银会员",
                    admin: "Admin_03",
                    note: "后勤专家",
                    lastOnline: "2024-03-15 18:30"
                },
                {
                    id: 8,
                    name: "Medic_Hero",
                    steamId: "STEAM_0:1:852963741",
                    avatar: "assets/avatar.png",
                    status: "active",
                    startDate: "2024-03-01",
                    endDate: "2024-06-01",
                    level: "黄金会员",
                    admin: "Admin_02",
                    note: "医疗专家",
                    lastOnline: "2024-03-20 12:15"
                },
                {
                    id: 9,
                    name: "Sniper_Elite",
                    steamId: "STEAM_0:1:741852963",
                    avatar: "assets/avatar.png",
                    status: "active",
                    startDate: "2024-02-01",
                    endDate: "2024-08-01",
                    level: "铂金会员",
                    admin: "Admin_01",
                    note: "狙击手",
                    lastOnline: "2024-03-20 10:45"
                },
                {
                    id: 10,
                    name: "Commander_Pro",
                    steamId: "STEAM_0:1:369258147",
                    avatar: "assets/avatar.png",
                    status: "active",
                    startDate: "2024-01-01",
                    endDate: "2024-12-31",
                    level: "钻石会员",
                    admin: "Admin_02",
                    note: "指挥官",
                    lastOnline: "2024-03-20 17:00"
                }
            ]
        };

        const vipsList = document.querySelector('.vips-grid');
        if (!vipsList) {
            console.error('VIPs grid container not found');
            return;
        }

        vipsList.innerHTML = mockVipsData.vips.map(vip => `
            <div class="vip-card">
                <div class="vip-header">
                    <img src="${vip.avatar}" class="vip-avatar">
                    <div class="vip-info">
                        <h3>${vip.name}</h3>
                        <span class="steam-id">${vip.steamId}</span>
                    </div>
                    <div class="vip-status ${vip.status}">${vip.status}</div>
                </div>
                <div class="vip-details">
                    <div class="detail-item">
                        <i class="fas fa-crown"></i>
                        <span class="level">${vip.level}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${vip.startDate} 至 ${vip.endDate}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-user-shield"></i>
                        <span>操作管理员: ${vip.admin}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-clock"></i>
                        <span>最后在线: ${vip.lastOnline}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-comment"></i>
                        <span>备注: ${vip.note}</span>
                    </div>
                </div>
                <div class="vip-actions">
                    <button class="btn"><i class="fas fa-edit"></i> 编辑</button>
                    <button class="btn"><i class="fas fa-history"></i> 续期</button>
                    <button class="btn danger"><i class="fas fa-trash"></i> 删除</button>
                </div>
            </div>
        `).join('');
    }

    loadAdminsData() {
        // 实现管理员管理数据加载
    }

    loadLogsData() {
        // 实现系统日志数据加载
    }

    initializeHamburgerMenu() {
        const hamburgerBtn = document.querySelector('.hamburger-btn');
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');

        if (hamburgerBtn) {
            hamburgerBtn.addEventListener('click', () => {
                this.sidebarExpanded = !this.sidebarExpanded;
                sidebar.classList.toggle('collapsed');
                mainContent.classList.toggle('expanded');
                
                // 更新汉堡按钮图标
                const icon = hamburgerBtn.querySelector('i');
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            });
        }

        // 检查屏幕大小并自动处理侧边栏状态
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.add('collapsed');
                mainContent.classList.add('expanded');
                this.sidebarExpanded = false;
            } else {
                sidebar.classList.remove('collapsed');
                mainContent.classList.remove('expanded');
                this.sidebarExpanded = true;
            }
        };

        // 初始化时检查一次
        handleResize();

        // 监听窗口大小变化
        window.addEventListener('resize', handleResize);
    }
}

// 初始化面板
document.addEventListener('DOMContentLoaded', () => {
    new SquadPanel();
}); 