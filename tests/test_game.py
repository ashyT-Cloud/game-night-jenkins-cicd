import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class GameTests(unittest.TestCase):
    def test_game_files_exist(self):
        for name in ("index.html", "game.js", "style.css"):
            with self.subTest(file=name):
                path = ROOT / "game" / name
                self.assertTrue(path.is_file())
                self.assertGreater(path.stat().st_size, 0)

    def test_html_loads_game_assets(self):
        html = (ROOT / "game/index.html").read_text()
        self.assertIn('id="game"', html)
        self.assertIn('href="style.css"', html)
        self.assertIn('src="game.js"', html)

    def test_game_controls_and_mechanics_exist(self):
        js = (ROOT / "game/game.js").read_text()
        for feature in (
            "requestAnimationFrame",
            "keydown",
            "keyup",
            "spawnAsteroid",
            "endGame",
            "startGame",
        ):
            with self.subTest(feature=feature):
                self.assertIn(feature, js)

    def test_game_has_score_lives_and_restart(self):
        html = (ROOT / "game/index.html").read_text()
        js = (ROOT / "game/game.js").read_text()
        self.assertIn('id="score"', html)
        self.assertIn('id="lives"', html)
        self.assertIn('id="start"', html)
        self.assertIn("PLAY AGAIN", js)


if __name__ == "__main__":
    unittest.main(verbosity=2)
