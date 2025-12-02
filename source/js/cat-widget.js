// cat-widget.js 修改后的开头
document.addEventListener('DOMContentLoaded', function() {
  // --- 从这里开始，把你原来的所有代码都移进来 ---


// 小猫的对话库（可以随意修改和添加）
const catMessages = [
    "喵~ 被你发现啦！",
    "欢迎你来这里参观！",
    "今天也要开心哦~",
    "啊？我...我叫喵喵！",
    "休息一下，喝杯咖啡吧 ☕",
    "我还有个小伙伴叫小黑，虽然我并不是很喜欢他",
    "你有鹌鹑冻干吗？或者猫条？咕噜咕噜~猫粮也行~",
    "我的毛茸茸的爪爪为你点赞！",
    "小黑还没来过这里呢，我是第一个！",
    "你爱我~呀，我爱你~生活总是甜蜜蜜~",
    "还是不上班好,吃了睡，睡了吃，美滋滋！",
    "你太在意过去，又担心未来，昨天是段历史，明天是个谜团，而今天是天赐的礼物！",
    "我是喵喵，他是小黑，哦，对了他还没来",
    "你的笑容很美，我喜欢看到你笑，要开心哦！",
    "你太厉害了！什么厉害？什么都厉害！",
    "你好啊，看见你我就很开心！喵~",
    "你要走了吗？嗯呜，再摸一摸我吧！",
    "你认识我的朋友吗，他是个很好的人，额，我说的不是小黑",
    "嗯呜，馍馍好吃！牛奶好喝！下次想吃鱼了，嘿嘿",
    "我现在还不能动，以后也许可以吧",
    "有烦心事的话，可以给我讲讲哦，我会安静的听着",
    "难过的时候，记得给自己一个拥抱。",
    "喵~我在呢，别担心，我会一直在你身边",
    "即使一直是阴天，我也会陪你等到阳光重新照进来的那一刻。",
    "喵喵喵，我是喵~嘿嘿嘿，他是黑~",

];

// 获取DOM元素
const catWidget = document.getElementById('cat-widget');
const catDialog = document.getElementById('cat-dialog');
const dialogText = document.getElementById('dialog-text');
const closeDialogBtn = document.getElementById('close-dialog');
//const closeBtn = document.getElementById('close-btn');
//const changeTextBtn = document.getElementById('change-text');
const clickEffect = document.getElementById('click-effect');

// 显示随机对话
function showRandomMessage() {
    const randomIndex = Math.floor(Math.random() * catMessages.length);
    dialogText.textContent = catMessages[randomIndex];
}

// 创建点击特效
function createClickEffect(x, y) {
    for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'click-sparkle';
        
        // 随机方向
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        sparkle.style.setProperty('--tx', `${tx}px`);
        sparkle.style.setProperty('--ty', `${ty}px`);
        sparkle.style.left = `${x - 3}px`;
        sparkle.style.top = `${y - 3}px`;
        
        // 随机颜色
        const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
        sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        clickEffect.appendChild(sparkle);
        
        // 动画结束后移除元素
        setTimeout(() => {
            sparkle.remove();
        }, 600);
    }
}

// 显示对话框
function showDialog() {
    catDialog.classList.add('show');
    // 添加轻微抖动动画
    catDialog.style.animation = 'none';
    setTimeout(() => {
        catDialog.style.animation = 'shake 0.5s ease';
    }, 10);
}

// 隐藏对话框
function hideDialog() {
    catDialog.classList.remove('show');
}

/*
// 点击小猫：显示特效 + 弹出对话框
catWidget.addEventListener('click', function(e) {
    // 创建点击特效
    createClickEffect(e.clientX, e.clientY);
    
    // 小猫点击动画
    this.style.transform = 'scale(0.9)';
    setTimeout(() => {
        this.style.transform = 'scale(1.1)';
    }, 100);
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 200);
    
    // 显示对话框和随机对话
    showRandomMessage();
    showDialog();
});
*/


// ====== 拖拽功能：移动整个容器 ======
let isDragging = false;
let dragStartX, dragStartY;
let containerStartX, containerStartY;

// 1. 获取容器元素
const catContainer = document.getElementById('cat-widget-container');

catWidget.addEventListener('mousedown', function(e) {
    e.preventDefault();
    isDragging = true;
    
    // 记录鼠标按下时的初始位置
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    
    // 获取容器当前的 left/top 值
    const style = window.getComputedStyle(catContainer);
    containerStartX = parseInt(style.left) || 0;
    containerStartY = parseInt(style.top) || 0;
    
    // 改变鼠标样式
    catWidget.style.cursor = 'grabbing';
    
    // 将事件监听器绑定到 document，确保即使鼠标快速移出小猫也能追踪
    document.addEventListener('mousemove', onMouseDrag);
    document.addEventListener('mouseup', onMouseUp);
});

function onMouseDrag(e) {
    if (!isDragging) return;
    
    // 计算鼠标拖拽的距离
    const deltaX = e.clientX - dragStartX;
    const deltaY = e.clientY - dragStartY;
    
    // 【核心】计算容器的新位置
    const newLeft = containerStartX + deltaX;
    const newTop = containerStartY + deltaY;
    
    // 应用新位置到容器上
    catContainer.style.left = newLeft + 'px';
    catContainer.style.top = newTop + 'px';
}

function onMouseUp() {
    if (!isDragging) return;
    isDragging = false;
    
    // 恢复鼠标样式
    catWidget.style.cursor = 'grab';
    
    // 移除全局事件监听器
    document.removeEventListener('mousemove', onMouseDrag);
    document.removeEventListener('mouseup', onMouseUp);
}





// 点击小猫：显示特效 + 弹出气泡对话框
catWidget.addEventListener('click', function(e) {

    // 新增：如果刚刚发生了拖拽，则不触发点击弹出事件
    
    if (isDragging) {
        // 即使拖拽结束，这次点击也不触发，直接返回
        return;
    }

    // 1. 阻止事件冒泡，防止立即触发document的点击关闭事件
    e.stopPropagation();
    
    // 2. 创建点击特效
    createClickEffect(e.clientX, e.clientY);
    
    // 3. 小猫点击动画
    this.style.transform = 'scale(0.9)';
    setTimeout(() => {
        this.style.transform = 'scale(1.1)';
    }, 100);
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 200);
    
    // 4. 显示对话框和随机对话
    showRandomMessage();
    
    // 5. 先关闭可能已打开的对话框和定时器
    hideDialog();
    
    // 6. 显示新对话框
    catDialog.classList.add('show');
    
    // 7. 【核心新增】设置5秒后自动关闭的定时器
    // 将定时器ID保存在对话框元素上，方便后续清除
    catDialog.autoCloseTimer = setTimeout(function() {
        hideDialog();
    }, 5000); // 5000毫秒 = 5秒
    
    // 8. 为对话框本身绑定点击事件，阻止其触发document的关闭事件
    catDialog.addEventListener('click', function(e) {
        e.stopPropagation();
    });



});

// 点击页面任意处（除了对话框和小猫本身）关闭对话框
document.addEventListener('click', function(e) {
    // 如果点击的不是对话框，也不是小猫，则关闭对话框
    if (!catDialog.contains(e.target) && e.target !== catWidget) {
        hideDialog();
    }
});

// 修改后的 hideDialog 函数：增加清除定时器的逻辑
function hideDialog() {
    // 清除可能存在的自动关闭定时器，防止内存泄漏
    if (catDialog.autoCloseTimer) {
        clearTimeout(catDialog.autoCloseTimer);
        catDialog.autoCloseTimer = null;
    }
    // 隐藏对话框
    catDialog.classList.remove('show');
}



// 添加抖动动画
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0) translateY(0) scale(1); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-3px) translateY(-3px) scale(1.02); }
        20%, 40%, 60%, 80% { transform: translateX(3px) translateY(3px) scale(0.98); }
    }
`;
document.head.appendChild(style);
});
