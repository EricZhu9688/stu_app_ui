/**
 * SubjectSwitcher Component
 * 用于页面顶部的学科切换基础组件
 */
class SubjectSwitcher {
    /**
     * @param {Object} options
     * @param {string} options.containerId - 容器ID
     * @param {Array<string>} options.subjects - 学科列表，默认为 ['语文', '数学', '英语']
     * @param {string} options.initialSubject - 初始选中的学科
     * @param {Function} options.onChange - 切换学科时的回调函数
     */
    constructor(options) {
        this.container = document.getElementById(options.containerId);
        this.subjects = options.subjects || ['语文', '数学', '英语'];
        this.currentSubject = options.initialSubject || this.subjects[0];
        this.onChange = options.onChange || (() => {});
        
        if (!this.container) {
            console.error(`SubjectSwitcher: Container with ID "${options.containerId}" not found.`);
            return;
        }

        this.render();
    }

    render() {
        this.container.innerHTML = this.subjects.map(subject => `
            <button 
                class="subject-tab ${subject === this.currentSubject ? 'active' : ''}" 
                data-subject="${subject}"
            >
                ${subject}
            </button>
        `).join('');

        // 绑定点击事件
        this.container.querySelectorAll('.subject-tab').forEach(btn => {
            btn.addEventListener('click', () => {
                const newSubject = btn.dataset.subject;
                if (newSubject !== this.currentSubject) {
                    this.switchSubject(newSubject);
                }
            });
        });
    }

    switchSubject(subject) {
        this.currentSubject = subject;
        
        // 更新 UI 状态
        this.container.querySelectorAll('.subject-tab').forEach(btn => {
            if (btn.dataset.subject === subject) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // 触发回调
        this.onChange(subject);
    }

    /**
     * 获取当前选中的学科
     */
    getCurrentSubject() {
        return this.currentSubject;
    }
}

// 导出组件（如果环境支持模块化）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SubjectSwitcher;
} else {
    window.SubjectSwitcher = SubjectSwitcher;
}
