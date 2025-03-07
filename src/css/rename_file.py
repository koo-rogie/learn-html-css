import os

# 🛠 수정할 폴더 경로
FOLDER_PATH = r"D:\coding\learn-html-css\src\css"

# 🔍 바꿀 경로명
OLD_TEXT = "/styes/"
NEW_TEXT = "/styles/"

# 수정된 파일 개수 카운트
modified_files = 0

# **HTML, CSS, JS 내부에서 경로 수정**
def update_file_contents():
    global modified_files
    for root, _, files in os.walk(FOLDER_PATH):
        for filename in files:
            if filename.endswith((".html", ".css", ".js")):
                file_path = os.path.join(root, filename)
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # 오타난 경로를 올바른 경로로 변경
                new_content = content.replace(OLD_TEXT, NEW_TEXT)
                
                if content != new_content:  # 내용이 변경된 경우만 저장
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    modified_files += 1
                    print(f"🔄 내부 경로 수정 완료: {filename}")

if __name__ == "__main__":
    print("\n📂 내부 파일 경로 자동 수정 시작!\n")
    update_file_contents()

    # ✅ 최종 결과 메시지 추가
    if modified_files > 0:
        print(f"\n🎉 모든 파일 수정 완료! 총 {modified_files}개의 파일이 수정되었습니다. ✅\n")
    else:
        print("\n✅ 모든 파일이 이미 올바르게 설정되어 있습니다. 변경 사항 없음! 😃\n")
