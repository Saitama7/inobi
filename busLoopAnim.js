function cubicBezier(z1, z2, t) {
    return (3 * z1 - 3 * z2 + 1) * t * t * t + (-6 * z1 + 3 * z2) * t * t + 3 * z1 * t;
}
function cubicBezierD(z1, z2, t) {
    return 3 * (3 * z1 - 3 * z2 + 1) * t * t + 2 * (-6 * z1 + 3 * z2) * t + 3 * z1;
}

const hypot = Math.hypot || function hypot() {
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        const v = arguments[i];
        sum += v * v;
    }
    return Math.sqrt(sum);
};

function isNear(x1, y1, x2, y2, radius) {
    return hypot(x1 - x2, y1 - y2) < radius;
}
const app = {
    fonts: {
        os: '-apple-system,BlinkMacSystemFont,arial,sans-serif',
        mono: 'Consolas,Courier,monospace'
    },
    colors: {
        bg: '#ffffff',
        rect: '#0088CD',
        point: '#0088CD',
        path: '#0088CD',
        value: '#0088CD',
        direction: 'rgba(0,0,0,0.2)'
    },
    duration: 3000,
    x1: 0.42,
    y1: 0,
    x2: 0.58,
    y2: 1,
    toClientX: function (x) {
        return (app.canvas.width / 2 + app.rectSize * (x - 0.5)) / devicePixelRatio;
    },
    toClientY: function (y) {
        return (app.canvas.height / 2 - app.rectSize * (y - 0.5)) / devicePixelRatio;
    },
    events: {},
    canvas: document.getElementById("busLoopDiv").appendChild(document.createElement('canvas'))
};
app.ctx = app.canvas.getContext('2d');

function onResize() {
    // app.canvas.width = innerWidth * devicePixelRatio;
    // app.canvas.height = innerHeight * devicePixelRatio;
    app.canvas.width = 500;
    app.canvas.height = 500;
    app.rectSize = 0.5 * Math.min(app.canvas.width, app.canvas.height, 800 * devicePixelRatio);
    app.margin = 0.03 * app.canvas.width;
}
window.addEventListener('resize', onResize);
onResize();
function getEventState(event) {
    const bb = app.canvas.getBoundingClientRect();
    const x = event.clientX - bb.left;
    const y = event.clientY - bb.top;
    const result = {
        identifier: event.identifier,
        clientX: event.clientX,
        clientY: event.clientY,
        x1: app.x1,
        y1: app.y1,
        x2: app.x2,
        y2: app.y2
    };
    if (isNear(x, y, app.toClientX(app.x1), app.toClientY(app.y1), 30)) {
        result.hover = 'p1';
    } else if (isNear(x, y, app.toClientX(app.x2), app.toClientY(app.y2), 30)) {
        result.hover = 'p2';
    }
    return result;
}
function onDown(event) {
    const state = getEventState(event);
    app.events[state.identifier] = state;
}
window.addEventListener('mousedown', onDown);
window.addEventListener('touchstart', function (event) {
    event.preventDefault();
    for (let i = 0; i < event.changedTouches.length; i++) {
        onDown(event.changedTouches.item(i));
    }
});
function onMove(event) {
    const state = app.events[event.identifier];
    if (state) {
        const dx = devicePixelRatio * (event.clientX - state.clientX) / app.rectSize;
        const dy = devicePixelRatio * (event.clientY - state.clientY) / app.rectSize;
        switch (state.hover) {
        case 'p1':
            app.x1 = state.x1 + dx;
            app.y1 = state.y1 - dy;
            break;
        case 'p2':
            app.x2 = state.x2 + dx;
            app.y2 = state.y2 - dy;
            break;
        }
    } else {
        const state = getEventState(event);
        if (state.hover) {
            app.canvas.style.cursor = 'move';
        } else {
            app.canvas.style.cursor = '';
        }
    }
}
window.addEventListener('mousemove', onMove);
window.addEventListener('touchmove', function (event) {
    event.preventDefault();
    for (let i = 0; i < event.changedTouches.length; i++) {
        onMove(event.changedTouches.item(i));
    }
});
function onUp(event) {
    delete app.events[event.identifier];
}
window.addEventListener('mouseup', onUp);
window.addEventListener('touchend', function (event) {
    event.preventDefault();
    for (let i = 0; i < event.changedTouches.length; i++) {
        onUp(event.changedTouches.item(i));
    }
});

requestAnimationFrame(function (t0) {
    const ctx = app.ctx;
    ctx.lineCap = 'round';
    ctx.font = '10px ' + app.fonts.os;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    render(t0);
    function render(t1) {
        requestAnimationFrame(render);
        const ctx = app.ctx;
        ctx.fillStyle = app.colors.bg;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const t = ((t1 - t0) % app.duration) / app.duration;
        const rectSize = app.rectSize;
        const px = devicePixelRatio / rectSize;
        ctx.save();
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.scale(rectSize, -rectSize);
        ctx.translate(-0.5, -0.5);
        // base rect
        ctx.beginPath();
        ctx.rect(0, 0, 1, 1);
        ctx.strokeStyle = app.colors.rect;
        ctx.lineWidth = px;
        ctx.stroke();
        // browser result
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(app.x1, app.y1, app.x2, app.y2, 1, 1);
        ctx.strokeStyle = app.colors.path;
        ctx.lineWidth = px;
        ctx.stroke();
        // handles
        [
            [0, 0, app.x1, app.y1],
            [1, 1, app.x2, app.y2]
        ]
        .forEach(function (point) {
            ctx.beginPath();
            ctx.moveTo(point[0], point[1]);
            ctx.lineTo(point[2], point[3]);
            ctx.strokeStyle = app.colors.point;
            ctx.lineWidth = 4 * px;
            ctx.stroke();
            ctx.beginPath();
            const radius = 12 * px;
            ctx.arc(point[0], point[1], radius / 2, 0, 2 * Math.PI);
            ctx.save();
            ctx.translate(point[2], point[3]);
            ctx.arc(0, 0, radius, 0, 2 * Math.PI);
            ctx.fillStyle = app.colors.point;
            ctx.fill();
            ctx.scale(px, -px);
            ctx.fillText('(' + point[2].toFixed(2) + ',' + point[3].toFixed(2) + ')', 0, 20);
            ctx.restore();
        });
        for (let t = 0; t <= 1; t += 0.1) {
            putPoint(t, px);
        }
        putPoint(t, px, -10, true);
        ctx.restore();
    }
    function putPoint(t, px, labelPos, drawD) {
        const x = cubicBezier(app.x1, app.x2, t);
        const y = cubicBezier(app.y1, app.y2, t);
        ctx.beginPath();
        ctx.arc(x, y, 4 * px, 0, 2 * Math.PI);
        ctx.fillStyle = app.colors.value;
        ctx.fill();
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(px, -px);
        ctx.fillText(t.toFixed(1), 0, labelPos || 10);
        ctx.restore();
        if (drawD) {
            const dx = cubicBezierD(app.x1, app.x2, t);
            const dy = cubicBezierD(app.y1, app.y2, t);
            const scale1 = hypot(ctx.canvas.width, ctx.canvas.height) / hypot(dx, dy);
            ctx.beginPath();
            ctx.moveTo(x - scale1 * dx, y - scale1 * dy);
            ctx.lineTo(x + scale1 * dx, y + scale1 * dy);
            ctx.strokeStyle = app.colors.direction;
            ctx.lineWidth = px;
            ctx.stroke();
            const scale2 = 0.1;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + scale2 * dx, y + scale2 * dy);
            ctx.strokeStyle = app.colors.value;
            ctx.lineWidth = 2 * px;
            ctx.stroke();
        }
    }
});