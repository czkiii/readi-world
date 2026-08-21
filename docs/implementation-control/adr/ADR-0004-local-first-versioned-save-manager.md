# ADR-0004 — Local-first, verziózott Save Manager és adapterhatár

- Státusz: `ACCEPTED`
- Dátum: 2026-07-30
- Döntéstulajdonos: `OWNER+TECH`
- Kapcsolt auditpontok: 40–45, 104, 220, 226, 251, 261, 293
- Bizonyíték: PR #3, `238d213`, save/migration tesztek

## Kontextus

A játék offline és megszakítható mobilélmény. A böngésző háttérbe kerülhet,
megszakíthatja az írást vagy tárhelyhibát adhat. P0/P1-ben nincs cloud,
export/import vagy hálózati játékadatküldés.

## Döntés

Verziózott, validált save envelope készül integritásellenőrzéssel, staged
aktiválással, egy aktív mentéssel és automatikus backuppal. A tárolás
platformadapter mögött van; weben IndexedDB/Web Locks használható. Cloud és
export később külön adapterrel csatlakozhat, de nem alapfüggőség.

## Következmények

- Hálózat nélkül is teljes alapjáték.
- Minden schema-változás migrációt és régi fixture-t igényel.
- Background/resume elsőrendű regresszió.
- Debug és teszt nem kerülheti meg a save-validációt.

## Felülvizsgálati trigger

Cloud/native követelmény külön scope-ban megnyílik, vagy a webes tároló
bizonyítottan nem teljesíti a P1 recovery/lifecycle kaput.
