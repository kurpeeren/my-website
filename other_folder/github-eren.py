import erenstd
erenstd.CtrlModule("requests","Pillow","io","json","re","shutil")

import requests
from PIL import Image
from io import BytesIO
import json
import re
import os
import shutil

# Github Project

class github_project():

    def __init__(self,github_username) -> None:
        self.github_username = github_username

    def get_repo_names(self,github_username):
        # GitHub API'si üzerinden kullanıcının repolarını çekmek için GET isteği gönderin
        url = f'https://api.github.com/users/{github_username}/repos'
    
        # GitHub API'ye yetkilendirme eklemek için gerekiyorsa bir token kullanabilirsiniz
        # headers = {'Authorization': 'token YOUR_GITHUB_TOKEN'}
    
        response = requests.get(url)
    
        # İstek başarılı ise (HTTP durumu 200 ise)
        if response.status_code == 200:
            # JSON yanıtını ayrıştırın ve repoların isimlerini içeren bir liste oluşturun
            repositories = [repo['name'] for repo in response.json()]
            return repositories
        else:
            print(f'Hata! HTTP durumu: {response.status_code}')
            return []
    
    def get_readme_content(self,github_username, repo_names):
        if not isinstance(repo_names, list):
            repo_names = [repo_names]  # Tek bir repo adı girilmişse listeye çevirin
        
        readme_contents = {}  # Repo adlarına göre README içeriklerini saklamak için bir sözlük
    
        for repo_name in repo_names:
            # GitHub API'si üzerinden belirli bir depodan README dosyasını çekmek için GET isteği gönderin
            url = f'https://api.github.com/repos/{github_username}/{repo_name}/readme'
    
            # GitHub API'ye yetkilendirme eklemek için gerekiyorsa bir token kullanabilirsiniz
            # headers = {'Authorization': 'token YOUR_GITHUB_TOKEN'}
    
            response = requests.get(url)
    
            # İstek başarılı ise (HTTP durumu 200 ise)
            if response.status_code == 200:
                # JSON yanıtını ayrıştırın ve README dosyasının içeriğini çözümleyin (Base64'den metne)
                readme_content = response.json().get('content', '')
                
                # Base64 kodlanmış içeriği çözümle
                import base64
                decoded_content = base64.b64decode(readme_content).decode('utf-8')
                
                # Sözlüğe ekleyin (repo adı -> README içeriği)
                readme_contents[repo_name] = decoded_content
            else:
                print(f'Hata! HTTP durumu: {response.status_code} for repo {repo_name}')
                readme_contents[repo_name] = None
    
        return readme_contents
    
    def extract_data_from_text(self,text):
        # Verileri saklayacak bir sözlük oluşturun
        data = {}
        # Metindeki tüm satırları inceleyin
        lines = text.split('\n')
        for line in lines:
            # Her satırı inceleyin ve istediğiniz verileri arayın
            match = re.search(r'<!-- <p class="([^"]+)" >([^<]+)</p> -->', line)
            if match:
                key = match.group(1)
                value = match.group(2)
                data[key] = value
        return data
    
    def trim_spaces_in_dict(self,d):
        trimmed_dict = {}
        for key, value in d.items():
            # key ve value'daki başındaki ve sonundaki boşlukları temizle
            trimmed_key = key.strip()
            trimmed_value = value.strip() if isinstance(value, str) else value
            trimmed_dict[trimmed_key] = trimmed_value
        return trimmed_dict
    
    def full_extract_data(self,readme_contents):
        result_dict = {}  # Sonuçları saklamak için boş bir sözlük oluşturun
        for key, value in readme_contents.items():
            trimmed_value = self.trim_spaces_in_dict(self.extract_data_from_text(value))
            result_dict[key] = trimmed_value  # İşlenmiş veriyi sonuç sözlüğüne ekleyin
        return result_dict  # Sonuç sözlüğünü döndürün
    
    def save_dict_to_json(self,data, filename):
        with open(filename, 'w', encoding='utf-8') as json_file:
            json.dump(data, json_file, ensure_ascii=False, indent=4)

    def download_and_save_image(self,url, save_path):
        try:
            response = requests.get(url)
            if response.status_code == 200:
                image = Image.open(BytesIO(response.content))
                image.save(save_path, format="PNG")
                erenstd.cprint(f"Resim başarıyla kaydedildi: {save_path}","success")
                return image
            else:
                erenstd.cprint(f"Hata: {response.status_code} - İndirme başarısız.","danger")
                return None
        except Exception as e:
            print(f"Hata: {e}")
            return None

    def download_image(self,url, save_path):
        try:
            response = requests.get(url)
            if response.status_code == 200:
                with open(save_path, 'wb') as file:
                    file.write(response.content)
                print(f"Resim başarıyla kaydedildi: {save_path}")
            else:
                print(f"Hata: {response.status_code} - İndirme başarısız.")
        except Exception as e:
            print(f"Hata: {e}")

    
    def create_or_replace_projects_folder(self,path):
        klasor_adi = "projects"
        klasor_yolu = os.path.join(path, klasor_adi)

        if os.path.exists(klasor_yolu) and os.path.isdir(klasor_yolu):
            erenstd.cprint(f"'{klasor_adi}' klasörü bulundu ve siliniyor...", "danger")
            shutil.rmtree(klasor_yolu)  # Klasörü ve içeriğini sil
        else:
            erenstd.cprint(f"'{klasor_adi}' klasörü bulunamadı.", "warning")

        erenstd.cprint(f"'{klasor_adi}' klasörü oluşturuluyor...", "info")
        os.mkdir(klasor_yolu)
        print(klasor_yolu)
        erenstd.cprint(f"'{klasor_adi}' klasörü başarıyla oluşturuldu.", "success")


# Program

github_username = 'kurpeeren'
gp=github_project(github_username)

repo_names = gp.get_repo_names(github_username)
readme_contents = gp.get_readme_content(github_username, repo_names)
fulldata=gp.full_extract_data(readme_contents)
#print(gp.full_extract_data(readme_contents))

current_directory = os.getcwd()
#filepath = os.path.dirname(current_directory) # bi üst klasör

gp.create_or_replace_projects_folder(current_directory)
gp.save_dict_to_json(fulldata,current_directory+ "\projects\project.json")

for name in repo_names:
    url = f"https://raw.githubusercontent.com/kurpeeren/{name}/main/images/main.png"
    gp.download_image(url,current_directory+"\\projects\\"+name+".png")

