import math, sys
out=sys.argv[1]
ACC="#ff6a2c"; MID="#e0561b"; DARK="#a83a0e"; BG="#0a0c0f"
def f(v): return f"{v:.2f}".rstrip("0").rstrip(".")
def poly(pts,fill,extra=""): return f'<polygon points="{" ".join(f(x)+","+f(y) for x,y in pts)}" fill="{fill}"{extra}/>'
def mark(ox=0, oy=0, s=1.0, star=True, n=5, gap=1.5, R=8.6):
    T=lambda x,y:(ox+x*s, oy+y*s)
    top=[(32,6),(54,18.5),(32,31),(10,18.5)]
    parts=[poly([T(*p) for p in top],ACC)]
    H=25.0
    for i in range(n):
        a=i*H/n + (gap/2 if i else 0) + 1.2; b=(i+1)*H/n - (gap/2 if i<n-1 else 0)
        parts.append(poly([T(10,18.5+a),T(32,31+a),T(32,31+b),T(10,18.5+b)],MID))
        parts.append(poly([T(32,31+a),T(54,18.5+a),T(54,18.5+b),T(32,31+b)],DARK))
    if star:
        r,cx,cy=R/2,32,18.5
        pts=[]
        for k in range(12):
            ang=math.radians(90+30*k); rad=R if k%2==0 else r
            X=rad*math.cos(ang); Y=-rad*math.sin(ang)
            pts.append(T(cx+X, cy+Y*0.5774))
        parts.append(poly(pts,BG))
    return "".join(parts)

open(f"{out}/logo-mark.svg","w").write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="8 4 48 54" role="img" aria-label="Chicago 3D Printworks">{mark()}</svg>\n')
# app icon: dark rounded square
open(f"{out}/logo-icon.svg","w").write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="{BG}"/>{mark(ox=8.8, oy=7.6, s=0.725)}</svg>\n')
# horizontal lockup
FONT="font-family=\"'Space Grotesk', 'Inter', 'Helvetica Neue', Arial, sans-serif\""
open(f"{out}/logo-horizontal.svg","w").write(
 f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 64" role="img" aria-label="Chicago 3D Printworks">'
 f'{mark(ox=-4, oy=0, s=1.0)}'
 f'<text x="62" y="27" {FONT} font-size="13" font-weight="500" letter-spacing="3.2" fill="#c4c9d0">CHICAGO</text>'
 f'<text x="61" y="50" {FONT} font-size="23" font-weight="700" letter-spacing="-0.4" fill="#eceef1">3D Printworks</text>'
 f'</svg>\n')
# favicon: simplified, fills the canvas
open(f"{out}/favicon.svg","w").write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="{BG}"/>{mark(ox=-3.2, oy=-1.6, s=1.1, n=3, gap=2.6, R=10)}</svg>\n')
print("ok")
