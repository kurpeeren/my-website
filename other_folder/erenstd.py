

# Eren'in Standart Python Kütüphanesi
# Eren's Standard Python Library

class Renkler:
    RENKLER = {
        'primary': '\033[34m',  # Mavi
        'success': '\033[32m',  # Yeşil
        'danger': '\033[31m',   # Kırmızı
        'warning': '\033[33m',  # Sarı
        'info': '\033[36m'      # Mavi-Turkuaz
    }

    @classmethod
    def renkli_metin(cls, metin, renk):
        renk_kodu = cls.RENKLER.get(renk)
        if renk_kodu:
            return f"{renk_kodu}{metin}\033[0m"
        else:
            return metin

def cprint(metin, renk):
    renkli_metin = Renkler.renkli_metin(metin, renk)
    print(renkli_metin)

def CtrlModule(*module_names):
    import importlib
    import subprocess

    # Yüklü olup olmadığını kontrol etmek istediğiniz modül adı

    for module_name in module_names:
        # Modül yüklü mü kontrol et
        try:
            importlib.import_module(module_name)
            cprint(f"{module_name} modülü zaten yüklü.","success")
        except ImportError:
            cprint(f"{module_name} modülü yüklü değil. Yükleniyor...","danger")

            # Modülü pip ile yükle
            subprocess.call(['pip', 'install', module_name])

            # Modül yüklendikten sonra tekrar kontrol et
            try:
                importlib.import_module(module_name)
                cprint(f"{module_name} modülü başarıyla yüklendi.","success")
            except ImportError:
                cprint(f"{module_name} modülünü yüklerken bir sorun oluştu. Manuel olarak yüklemeniz gerekebilir.","warning")



"""
import tkinter as tk
from tkinter import filedialog

def select_folder_dialog():
    root = tk.Tk()
    root.withdraw()  # Pencereyi gizle
    folder_path = filedialog.askdirectory(title="Klasör Seç")  # Klasör seçme dialogunu aç
    return folder_path

def select_file_dialog():
    root = tk.Tk()
    root.withdraw()  # Pencereyi gizle
    file_path = filedialog.askopenfilename(title="Dosya Seç")  # Dosya seçme dialogunu aç
    return file_path

def save_file_dialog():
    root = tk.Tk()
    root.withdraw()  # Pencereyi gizle
    file_path = filedialog.asksaveasfilename(title="Dosya Kaydet")  # Dosya kaydetme dialogunu aç
    return file_path

"""