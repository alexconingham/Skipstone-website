from docx import Document
import sys

path = r"c:\Users\alex_\OneDrive\Desktop\tools\RTD site\scripts\temp.docx"
doc = Document(path)
for i, p in enumerate(doc.paragraphs):
    sname = p.style.name if p.style else "None"
    print(f"{i:04d}|{sname}|{p.text}")
