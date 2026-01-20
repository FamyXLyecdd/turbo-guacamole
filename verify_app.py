from playwright.sync_api import sync_playwright, expect
import time

def verify_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 720})

        try:
            print("Visiting Home...")
            page.goto("http://localhost:4173")
            # Wait for animation
            time.sleep(2)
            page.screenshot(path="/home/jules/verification/1_home.png")

            print("Clicking Start...")
            # Click the link wrapping the button or the button itself
            page.get_by_role("button", name="Initialize System").click()

            print("Visiting Map...")
            # Wait for map load
            page.wait_for_url("**/map")
            time.sleep(1)
            page.screenshot(path="/home/jules/verification/2_map.png")

            print("Selecting Lesson...")
            # Click the first available node (Module 1, Lesson 1)
            # Since nodes are custom divs with onClick, we might need a selector
            # I added 'Signal Transmission' as title
            page.get_by_text("Signal Transmission").click()

            print("Visiting Lesson...")
            page.wait_for_url("**/lesson/**")
            time.sleep(2) # Wait for pyodide to potentially load/init
            page.screenshot(path="/home/jules/verification/3_lesson.png")

            print("Running Code...")
            # Click Run Code
            page.get_by_role("button", name="Run Code").click()

            # Wait for execution (simulated)
            time.sleep(3)
            page.screenshot(path="/home/jules/verification/4_lesson_run.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="/home/jules/verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_app()
