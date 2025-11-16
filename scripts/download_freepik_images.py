import requests
import json
import os
import gzip
import brotli

api_url = "https://www.freepik.com/api/regular/search?filters[license]=free&locale=en&term=%40catalyststuff%20astronaut"

# Create session with cookies
session = requests.Session()
session.cookies.set('_fcid', 'FC.66e3e032-71f2-7460-46ff-3cd63a402d95', domain='www.freepik.com')
session.cookies.set('ph_phc_Rc6y1yvZwwwR09Pl9NtKBo5gzpxr1Ei4Bdbg3kC1Ihz_posthog', '%7B%22distinct_id%22%3A%22170754886%22%2C%22%24sesid%22%3A%5Bnull%2Cnull%2Cnull%5D%2C%22%24epp%22%3Atrue%2C%22%24initial_person_info%22%3A%7B%22r%22%3A%22https%3A%2F%2Fwww.freepik.com%2Fai%2Fimage-generator%22%2C%22u%22%3A%22https%3A%2F%2Fwww.freepik.com%2Fpikaso%2Fai-image-generator%3Fprompt%3DA%2Bdramatic%2Baerial%2Bcontrol-room%2Btheme%2Bfor%2Ban%2Bairport%2Bplanning%2Bcontest%253A%2Ba%2Bclean%252C%2Bstylized%2Bscene%2Bseen%2Bfrom%2Babove%2Bshowing%2Bseveral%2Bcircular%2Bradar%2Binfluence%2Bzones%2B%2528soft%2Bglowing%2Bdiscs%2529%2Bover%2Ba%2Bcoastal%2Bcluster%2Bof%2Bfloating%2Bair%2Bplatforms%2Band%2Ba%2Bsimplified%2Bcity%2Bgrid.%2BOverlay%2Ba%2Bcrisp%2Bminimal%2Baxis-aligned%2Brectangle%2B%2528thin%2Bneon%2Boutline%2529%2Bthat%2Bencloses%2Ball%2Bcircles%252C%2Bhighlighted%2Bin%2Ba%2Bcontrasting%2Bcolor.%2BInclude%2Bsubtle%2BAR-like%2Bgridlines%2Band%2BHUD%2Belements%252C%2Bsoft%2Bvolumetric%2Blight%252C%2Bcool%2Bblue%2Band%2Bteal%2Bpalette%2Bwith%2Bwarm%2Baccent%2B%2528orange%2529%2Bon%2Bthe%2Brectangle.%2BHigh%2Bdetail%252C%2Bsemi-realistic%252C%2Bmodern%2Bsci%25E2%2580%2591fi%2BUI%2Baesthetic%252C%2Bwide%2Bpanoramic%2Bcomposition%252C%2Bstrong%2Bnegative%2Bspace%2Bon%2Bthe%2Bright%2Bfor%2Btitle%2Btext%252C%2B3%253A1%2Baspect%2Bratio.%26submit%3D1%26style%3DnoStyle%23from_element%3Dlanding_tti%22%7D%7D', domain='.freepik.com')
session.cookies.set('filters_test', 'C', domain='www.freepik.com')
session.cookies.set('_fc', 'FC.96c89138-f9e9-c52a-9b84-9a92b7d44227', domain='www.freepik.com')
session.cookies.set('sidebar_smart_bar_test', 'B2', domain='.freepik.com')
session.cookies.set('filters-configs', '{"expanded":{"type":true,"license":true,"iconType":true},"group":[{"name":"type","show":true},{"name":"license","show":true},{"name":"iconType","show":true}],"show":false}', domain='www.freepik.com')
session.cookies.set('GR_LGURI', 'https://www.freepik.com/free-vector/astronaut-confused-cartoon-illustration-science-technology-concept-isolated-flat-cartoon-style_16425898.htm#fromView=keyword&page=1&position=23&uuid=87aa9727-0c9c-43b6-b71d-fe8823a345dd&query=Chibi+astronaut', domain='.freepik.com')
session.cookies.set('sb-prefs', '{"mode":"anchored"}', domain='www.freepik.com')
session.cookies.set('search-filters', '{}', domain='www.freepik.com')
session.cookies.set('g_state', '{"i_l":0,"i_ll":1763247199914,"i_b":"AYEgYDNieKSv/5lTB4kSy9Q5IPyeytIEMztXx0mAMQc"}', domain='www.freepik.com')

headers = {
    'authority': 'www.freepik.com',
    'method': 'GET',
    'path': '/api/regular/search?filters[license]=free&locale=en&term=%40catalyststuff%20astronaut',
    'scheme': 'https',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'accept-encoding': 'gzip, deflate, br, zstd',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=0, i',
    'sec-ch-ua': '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36'
}

# Fetch first page to get pagination info
response = session.get(api_url, headers=headers)
print("Status:", response.status_code)
print("Content-Encoding:", response.headers.get('Content-Encoding'))
data = response.json()

total_pages = data['pagination']['lastPage']
images = []

# Collect all image URLs from all pages
for page in range(1, total_pages + 1):
    if page > 1:
        page_url = f"{api_url}&page={page}"
        response = session.get(page_url, headers=headers)
        data = response.json()
    
    for item in data['items']:
        img_url = item['preview']['url']
        images.append(img_url)

# Create directory for images
os.makedirs('downloaded_images', exist_ok=True)

# Download all images
for i, img_url in enumerate(images):
    try:
        img_response = session.get(img_url)
        # Get file extension from URL
        ext = img_url.split('.')[-1].split('?')[0] if '.' in img_url else 'jpg'
        filename = f"downloaded_images/image_{i}.{ext}"
        with open(filename, 'wb') as f:
            f.write(img_response.content)
        print(f"Downloaded {filename}")
    except Exception as e:
        print(f"Failed to download {img_url}: {e}")

print("Download complete.")