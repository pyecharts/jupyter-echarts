import shutil
import glob

for js in glob.glob('echarts/*.min.js'):
    if 'echarts-' in js or 'echarts.min' in js:
        continue
    new_js = js.replace('.min', '')
    print("duplicate %s %s" % (js, new_js))
    shutil.copy(js, new_js)
