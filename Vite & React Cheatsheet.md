# Vite & React Cheatsheet

2026-09-17 · @Someone

Praktische Punkte für den Start eines neuen Projekts mit Vite und React, gesammelt während des Full Stack Open Kurses.

## Setup & Tooling

## Projektstruktur

## Komponenten & JSX

## Props & State

## Event Handling

- Ein Event Handler muss immer eine Funktion oder eine Funktionsreferenz sein, z.B. `onClick={handleClick}` oder `onClick={() => ...}`. Ein direkter Funktionsaufruf wie `onClick={setCounter(counter + 1)}` wird sofort beim Rendern ausgeführt und kann eine Endlosschleife auslösen.
- Für einfache Handler reicht eine Inline Arrow Function: `onClick={() => setValue(0)}`.
- Für mehrere Anweisungen die geschweifte Klammer Syntax nutzen: `const handleClick = () => { console.log('clicked'); setValue(0) }`.
- Komplexere oder wiederverwendete Handler als eigene benannte Funktion definieren statt sie direkt im JSX zu schreiben. Übliche Namenskonvention: Prop `onSomething`, zugehörige Funktion `handleSomething`.
- Event Handler lassen sich per Props an Kindkomponenten weiterreichen, z.B. `<Button onClick={increaseByOne} text='plus' />`.
- Eine Funktion, die eine Funktion zurückgibt, kann parametrisierte Handler erzeugen (`const setToValue = (newValue) => () => setValue(newValue)`). Meist reicht aber eine normale Funktion mit Parameter, die im JSX per Arrow Function aufgerufen wird: `onClick={() => setToValue(0)}`.
- State niemals direkt mutieren (kein `push`, kein `x++`, keine direkte Objektfeld-Zuweisung). Stattdessen immer ein neues Objekt/Array per Spread (`{ ...state, feld: neuerWert }`) oder `concat` erzeugen und per Setter setzen.
- State-Updates sind asynchron: nach `setLeft(left + 1)` enthält `left` im selben Funktionsdurchlauf noch den alten Wert. Für Folgeberechnungen im selben Handler eine Zwischenvariable nutzen (`const updated = left + 1; setLeft(updated); setTotal(updated + right)`).
- Komponenten nie innerhalb anderer Komponenten definieren (auch nicht für Event-Handler-Komponenten wie Display/Button). React behandelt sie sonst bei jedem Render als neue Komponente, was Optimierung verhindert und zu Bugs führt.

## Styling

## Sonstiges
