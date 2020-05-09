const miModulo = (() => {
    "use strict";
    let e = [];
    const t = ["C", "D", "H", "S"],
        n = ["A", "J", "Q", "K"];
    let a = [];
    const r = document.querySelector("#btnPedir"),
        o = document.querySelector("#btnDetener"),
        l = (document.querySelector("#btnNuevo"), document.querySelectorAll(".divCartas")),
        s = document.querySelectorAll("small"),
        d = () => {
            e = [];
            for (let n = 2; n <= 10; n++)
                for (let a of t) e.push(n + a);
            for (let a of t)
                for (let t of n) e.push(t + a);
            return _.shuffle(e)
        },
        c = () => { if (0 === e.length) throw "No hay cartas en el deck"; return e.pop() },
        i = (e, t) => (a[t] = a[t] + (e => { const t = e.substring(0, e.length - 1); return isNaN(t) ? "A" === t ? 11 : 10 : 1 * t })(e), s[t].innerText = a[t], a[t]),
        u = (e, t) => {
            const n = document.createElement("img");
            n.src = `assets/cartas/${e}.png`, n.classList.add("carta"), l[t].append(n)
        },
        h = e => {
            let t = 0;
            do {
                const e = c();
                t = i(e, a.length - 1), u(e, a.length - 1)
            } while (t < e && e <= 21);
            (() => {
                const [e, t] = a;
                setTimeout(() => { t === e ? alert("Nadie gana =/") : e > 21 ? alert("La computadora gana") : t > 21 ? alert("JUgador Gana!!") : alert("COmputadora Gana!") }, 10)
            })()
        };
    return r.addEventListener("click", () => {
        const e = c(),
            t = i(e, 0);
        u(e, 0), t > 21 ? (console.warn("Lo siento, has perdido"), r.disabled = !0, o.disabled = !0, h(t)) : 21 === t && (console.warn("21, genial!"), r.disabled = !0, o.disabled = !0, h(t))
    }), o.addEventListener("click", () => { r.disabled = !0, o.disabled = !0, h(a[0]) }), {
        nuevoJuego: (t = 2) => {
            e = d(), a = [];
            for (let e = 0; e < t; e++) a.push(0);
            s.forEach(e => e.innerText = 0), l.forEach(e => e.innerHTML = ""), r.disabled = !1, o.disabled = !1
        }
    }
})();