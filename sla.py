from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Dados do cliente
cliente = {
    "id": "1",
    "nome": "Leonardo Silva",
    "rg": "12.345.678-9",
    "cpf": "123.456.789-00",
    "email": "leo@email.com",
    "telefone": "(11) 99999-0000",
    "celular": "(11) 98888-0000",
    "cep": "15000-000",
    "endereco": "Rua das Flores",
    "numero": "123",
    "complemento": "Apto 45",
    "bairro": "Centro",
    "cidade": "Mirassol",
    "estado": "SP"
}

# Caminho para o ChromeDriver
driver = webdriver.Chrome(executable_path="C:/chromedriver.exe")

# 1️⃣ Acessa o painel Supabase
driver.get("https://supabase.com/dashboard/project/ntzvhpchywccckfvipkb/editor")

time.sleep(5)  # espera carregar a página

# ⚠️ Aqui você precisará logar manualmente (ou automatizar login, não recomendado por segurança)

# 2️⃣ Clica em "New Row" ou equivalente
new_row_button = driver.find_element(By.XPATH, '//button[contains(text(),"New Row")]')
new_row_button.click()
time.sleep(1)

# 3️⃣ Preenche os campos
for key, value in cliente.items():
    try:
        campo = driver.find_element(By.XPATH, f'//input[@placeholder="{key}"]')
        campo.clear()
        campo.send_keys(value)
    except:
        print(f"Campo {key} não encontrado")
        continue

time.sleep(1)

# 4️⃣ Salva a linha
save_button = driver.find_element(By.XPATH, '//button[contains(text(),"Save")]')
save_button.click()

print("Dados inseridos via Selenium!")

# Espera um pouco e fecha
time.sleep(5)
driver.quit()
