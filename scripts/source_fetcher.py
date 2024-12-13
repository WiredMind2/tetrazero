import os
import re
import requests


main_url = "https://williams-dapper-site-31482a.webflow.io"
urls = {
    main_url: 'landpage', 
    f"{main_url}/about": 'about'
}

for url, folder in urls.items():

    r = requests.get(url)

    r.encoding = r.apparent_encoding
    section_data = re.findall(
        r'(<section class="main-section">.*<\/section>)', r.text, re.DOTALL
    )[0]

    text_replace = {
        "class=": "className=",  # JSX fix
        "<img ": "<Image ",  # Next.js Image component
        '<div className="w-icon-nav-menu"></div>': '<svg className="w-icon-nav-menu" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>'
    }

    for src, dst in text_replace.items():
        section_data = section_data.replace(src, dst)

    re_replace = {
        r'<div className="carousel">((?:.|\n)+?<\/div>)<\/div>': "<Carousel/>",
        r'(<div id="tsparticles" className="tsparticles"></div>)': "<ParticleJS/>",
        r'<Image src="([^\s]+?)"[\w\s"=]+?className="icon_img" ?\/>': {
            "https://cdn.prod.website-files.com/66d4b2638b4f7b26a332418f/66ec5a2433480bbc3ff56969_favicon.webp": "/favicon.webp",
        },
    }

    def replace_func(data):
        def wrapped(match):
            full, group = match[0], match[1]
            if isinstance(data, dict):
                replacement = data.get(group, group)
            else:
                replacement = data
            start = full.find(group)
            out = full[:start] + replacement + full[start + len(group) :]
            return out
        return wrapped

    for pat, data in re_replace.items():
        section_data = re.sub(pat, replace_func(data), section_data)

    path = f"src/app/{folder}/raw-webflow.tsx"
    os.makedirs(os.path.dirname(path), exist_ok=True)

    with open(path, "w") as f:
        content = f"""\
        import Carousel from "../components/carousel";
        import Image from 'next/image';
        import ParticleJS from "../particleJS";
        export default function RawWebflow() {{
        return (
            {section_data}
        )}};\
        """
        f.write(content)


style_url = re.findall(
    r'<link href="(.*?)" rel="stylesheet" type="text\/css"\/>', r.text
)[0]
r = requests.get(style_url)

with open("src/app/css/globals.css", "w") as f:
    f.write(r.text)
