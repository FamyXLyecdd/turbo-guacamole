import os
from playwright.sync_api import sync_playwright

def run_verification():
    print("Starting Gamification Verification...")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 720})
        page = context.new_page()

        # 1. Load Home
        print("Loading Home...")
        page.goto("http://localhost:5173")
        page.wait_for_selector("text=THE ARCHITECT")

        page.screenshot(path="/home/jules/verification/5_gamification_home.png")
        print("Home verified.")

        # 2. Go to Map
        print("Navigating to Path...")
        # 'Initialize System' is inside a Link to /map
        page.click("text=Initialize System")

        page.wait_for_selector("text=The Awakening")

        # Verify Stats are visible on Map (Shell is present here)
        page.wait_for_selector("text=Streak")
        page.wait_for_selector("text=CPU")

        page.screenshot(path="/home/jules/verification/6_gamification_map.png")
        print("Map verified.")

        # 3. Enter Quiz Lesson (L1-4: Variable Naming)
        print("Entering Quiz Lesson...")
        page.goto("http://localhost:5173/lesson/l1-4")
        page.wait_for_selector("text=Syntax Validation")
        page.wait_for_selector("text=Select the INVALID variable name")

        # Take screenshot of Quiz UI
        page.screenshot(path="/home/jules/verification/7_quiz_start.png")

        # Click correct answer (Index 2: '2_fast')
        page.click("text=2_fast")
        page.click("text=CONFIRM_SELECTION")

        # Wait for success
        page.wait_for_selector("text=System Validated")
        page.screenshot(path="/home/jules/verification/8_quiz_success.png")
        print("Quiz verified.")

        # 4. Enter FillBlank Lesson (L1-2: Memory Allocation)
        print("Entering FillBlank Lesson...")
        page.goto("http://localhost:5173/lesson/l1-2")
        page.wait_for_selector("text=COMPLETE THE PATTERN")

        # Take screenshot
        page.screenshot(path="/home/jules/verification/9_fillblank_start.png")

        # Click correct option (Index 0: '"INTP"')
        # Use exact string match with quotes to distinguish from the variable name 'INTP' (Index 1)
        # We search for the button containing exactly "INTP" (including quotes)
        page.click('button:has-text(\'"INTP"\')')
        page.click("text=COMPILE")

        # Wait for internal success message first
        page.wait_for_selector("text=COMPILE SUCCESSFUL")

        # Wait for global success (after 1.5s delay)
        page.wait_for_selector("text=System Validated")
        page.screenshot(path="/home/jules/verification/10_fillblank_success.png")
        print("FillBlank verified.")

        browser.close()
        print("Verification Complete!")

if __name__ == "__main__":
    run_verification()
