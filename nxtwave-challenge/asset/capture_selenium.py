import os
import sys
import time

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

from selenium import webdriver
from selenium.webdriver.edge.options import Options as EdgeOptions
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def run_automation():
    print("🚀 Initializing Selenium with Edge headless...")
    options = EdgeOptions()
    options.add_argument("--headless=new")
    options.add_argument("--window-size=1280,900")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")

    driver = webdriver.Edge(options=options)
    driver.set_window_size(1280, 950)

    screenshots_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "screenshots"))
    os.makedirs(screenshots_dir, exist_ok=True)

    try:
        # 1. Landing Hero
        print("📸 1. Capturing Landing Page...")
        driver.get("http://localhost:3000/")
        time.sleep(2)
        driver.save_screenshot(os.path.join(screenshots_dir, "01_landing_hero.png"))
        print("✅ 01_landing_hero.png saved")

        # 2. AI Idea Generator
        print("📸 2. Capturing AI Project Hook...")
        # Find AI Idea Generator nav button
        buttons = driver.find_elements(By.TAG_NAME, "button")
        for b in buttons:
            if "AI Idea Generator" in b.text:
                b.click()
                break
        time.sleep(1)

        # Click Generate button
        gen_buttons = driver.find_elements(By.TAG_NAME, "button")
        for b in gen_buttons:
            if "Generate AI Project Blueprint" in b.text:
                b.click()
                break
        time.sleep(1.5)
        driver.save_screenshot(os.path.join(screenshots_dir, "02_ai_project_hook.png"))
        print("✅ 02_ai_project_hook.png saved")

        # 3. Registration Modal
        print("📸 3. Capturing Registration Modal...")
        reg_buttons = driver.find_elements(By.TAG_NAME, "button")
        for b in reg_buttons:
            if "Register Free" in b.text or "Claim Your Free Seat" in b.text:
                b.click()
                break
        time.sleep(1)

        # Fill inputs
        name_input = driver.find_element(By.XPATH, "//input[contains(@placeholder, 'Ganesh')]")
        name_input.clear()
        name_input.send_keys("Ganesh Annavarapu")

        email_input = driver.find_element(By.XPATH, "//input[contains(@placeholder, 'name@')]")
        email_input.clear()
        email_input.send_keys("ganesh.cse@cbit.ac.in")

        phone_input = driver.find_element(By.XPATH, "//input[contains(@placeholder, '9876543210')]")
        phone_input.clear()
        phone_input.send_keys("9876543210")
        time.sleep(0.5)

        driver.save_screenshot(os.path.join(screenshots_dir, "03_registration_modal.png"))
        print("✅ 03_registration_modal.png saved")

        # 4. Confirm Registration & Viral Referral Loop
        print("📸 4. Capturing Referral Engine & Progress Bar...")
        sub_buttons = driver.find_elements(By.TAG_NAME, "button")
        for b in sub_buttons:
            if "Confirm Registration" in b.text:
                b.click()
                break
        time.sleep(1.5)

        # Click simulate friend 3 times
        for i in range(3):
            sim_buttons = driver.find_elements(By.TAG_NAME, "button")
            for b in sim_buttons:
                if "Simulate Friend Signup" in b.text:
                    b.click()
                    time.sleep(0.8)
                    break

        time.sleep(1)
        driver.save_screenshot(os.path.join(screenshots_dir, "04_referral_loop_progress.png"))
        print("✅ 04_referral_loop_progress.png saved")

        # 5. Ambassador & Admin Dashboard
        print("📸 5. Capturing Ambassador & Admin Dashboard...")
        close_buttons = driver.find_elements(By.TAG_NAME, "button")
        for b in close_buttons:
            if "Back to Workshop Details" in b.text:
                b.click()
                break
        time.sleep(0.5)

        dash_buttons = driver.find_elements(By.TAG_NAME, "button")
        for b in dash_buttons:
            if "Ambassador & Admin" in b.text:
                b.click()
                break
        time.sleep(0.8)

        # Click auto unlock
        unlock_buttons = driver.find_elements(By.TAG_NAME, "button")
        for b in unlock_buttons:
            if "auto-unlock" in b.text:
                b.click()
                break
        time.sleep(1.5)
        driver.save_screenshot(os.path.join(screenshots_dir, "05_ambassador_dashboard.png"))
        print("✅ 05_ambassador_dashboard.png saved")

        # 6. WhatsApp Message Kit
        print("📸 6. Capturing WhatsApp Message Kit...")
        wa_buttons = driver.find_elements(By.TAG_NAME, "button")
        for b in wa_buttons:
            if "WhatsApp Kit" in b.text:
                b.click()
                break
        time.sleep(1)
        driver.save_screenshot(os.path.join(screenshots_dir, "06_whatsapp_message_kit.png"))
        print("✅ 06_whatsapp_message_kit.png saved")

        print("🎉 ALL 6 SCREENSHOTS CAPTURED SUCCESSFULLY!")

    finally:
        driver.quit()

if __name__ == "__main__":
    run_automation()
